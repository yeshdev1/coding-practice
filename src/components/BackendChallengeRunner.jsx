import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import ChallengeTimer from './ChallengeTimer';

const BackendChallengeRunner = ({ challenge }) => {
  // Multi-file support: code is now an object { 'filename': 'content' } if type is 'multi-step'
  // OR string if single-file.
  // To simplify, we'll treat single files as { 'Solution.js': content }
  
  const [files, setFiles] = useState({}); 
  const [activeFile, setActiveFile] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  
  const [logs, setLogs] = useState([]);
  const [testResults, setTestResults] = useState(null);

  // Initialize state based on challenge type
  useEffect(() => {
    setLogs([]);
    setTestResults(null);
    setCurrentStep(0);
    
    if (challenge.type === 'multi-step') {
      // Load files from steps
      const initialFiles = {};
      challenge.steps.forEach(step => {
        initialFiles[step.fileName] = step.initialCode || '';
      });
      setFiles(initialFiles);
      setActiveFile(challenge.steps[0].fileName);
    } else {
      // Legacy single-file mode
      setFiles({ 'Solution.js': challenge.initialCode || '' });
      setActiveFile('Solution.js');
    }
  }, [challenge.id, challenge.type, challenge.steps, challenge.initialCode]);

  const handleCodeChange = (value) => {
    setFiles(prev => ({ ...prev, [activeFile]: value }));
  };

  const runTests = async () => {
    // Track event in Google Analytics
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'run_tests_backend', {
            event_category: 'engagement',
            event_label: challenge.id
        });
    }

    setLogs([]);
    setTestResults(null);
    
    const capturedLogs = [];
    const mockConsole = {
      log: (...args) => capturedLogs.push({ type: 'log', content: args.map(String).join(' ') }),
      error: (...args) => capturedLogs.push({ type: 'error', content: args.map(String).join(' ') }),
      warn: (...args) => capturedLogs.push({ type: 'warn', content: args.map(String).join(' ') }),
    };

    const mockSystem = {
      db: {
        store: { ...(challenge.mockDb || {}) },
        async get(key) { return this.store[key]; },
        async set(key, val) { this.store[key] = val; },
        async incr(key, amount = 1) { 
            const current = this.store[key] || 0;
            this.store[key] = current + amount;
            return this.store[key];
        },
        async scan(prefix) {
            return Object.keys(this.store)
                .filter(k => k.startsWith(prefix))
                .map(k => ({ key: k, value: this.store[k] }));
        }
      },
      cache: {
        store: {},
        async get(key) { return this.store[key] || null; },
        async set(key, val, /* _ttl */) { this.store[key] = val; }, 
        async del(key) { delete this.store[key]; }
      },
      queue: {
        items: [],
        async push(item) { this.items.push(item); },
        async pop() { return this.items.shift() || null; },
        async peek() { return this.items[0] || null; }
      },
      lb: {
        nodes: ['node-1', 'node-2', 'node-3'],
        strategy: 'round-robin',
        counter: 0,
        getNextNode() {
          const node = this.nodes[this.counter % this.nodes.length];
          this.counter++;
          return node;
        }
      }
    };

    try {
      // Prepare Execution Context
      // We need to execute all files in order or make them available to each other.
      // Simple module system simulation:
      const modules = {};
      
      // Determine which steps/files are active/required
      const stepsToRun = challenge.type === 'multi-step' 
        ? challenge.steps.slice(0, currentStep + 1) 
        : [{ fileName: 'Solution.js' }]; // Single file case

      // Execute each file and capture exports
      for (const step of stepsToRun) {
        const fileName = step.fileName || 'Solution.js';
        const fileCode = files[fileName];
        
        const wrappedCode = `
          const _customRequire = (name) => {
             // Simple require to access previous modules
             // e.g. require('./InventoryService.js')
             const cleanName = name.replace('./', '');
             return modules[cleanName] || {};
          };
          
          const _exports = {};
          // We support user writing "module.exports = ..." OR "export const ..." (babel transform needed for real ES6 but here we cheat)
          // To keep it simple without babel in backend runner yet: assume user assigns to 'exports' or returns a value.
          // Let's inject 'exports' and 'module' objects.
          
          const _module = { exports: {} };
          
          // Inject our custom require as 'require' in the scope of the user code
          // This works because we're inside a new function scope
          const require = _customRequire;
          const module = _module;
          const exports = _exports;

          ${fileCode}
          
          // Capture what user exported
          // Fallback: check if they defined a global function named 'solution' (legacy)
          if (Object.keys(module.exports).length > 0) return module.exports;
          if (Object.keys(exports).length > 0) return exports;
          return typeof solution !== 'undefined' ? solution : null;
        `;

        // We pass 'null' for the 'require' argument to new Function to avoid the collision,
        // or we can just not pass it and define it inside.
        // Let's remove 'require', 'module', and 'exports' from the arguments list of new Function to be safe.
        const fileFn = new Function('console', 'system', 'modules', wrappedCode);
        
        // Run the file code
        const exported = fileFn(mockConsole, mockSystem, modules);
        
        modules[fileName] = exported;
      }

      // Identify the entry point function for the CURRENT step's tests
      const currentStepObj = challenge.type === 'multi-step' ? challenge.steps[currentStep] : challenge;
      const activeFileName = currentStepObj.fileName || 'Solution.js';
      const entryPoint = modules[activeFileName];
      
      // If the entry point is an object (module.exports), look for 'solution' or default export
      let userFunction = entryPoint;
      if (typeof entryPoint === 'object' && entryPoint !== null) {
         if (typeof entryPoint.solution === 'function') userFunction = entryPoint.solution;
         else if (typeof entryPoint.default === 'function') userFunction = entryPoint.default;
      }

      if (typeof userFunction !== 'function') {
        // In multi-step, maybe we are testing a class or an object method?
        // For now enforce exporting a function or 'solution'
         if (typeof entryPoint === 'object') {
             // Maybe the test case calls methods on this object directly?
             userFunction = entryPoint; // Allow object if tests handle it
         } else {
             throw new Error(`File ${activeFileName} must export a function or object.`);
         }
      }

      // Run Test Cases for the CURRENT step
      const results = [];
      let passedCount = 0;

      for (const testCase of currentStepObj.testCases) {
        try {
          const input = JSON.parse(JSON.stringify(testCase.input)); 
          const expected = testCase.expected;
          
          let result;
          
          if (testCase.mode === 'method_call') {
             // Test case specifies method to call on exported object
             // input: { method: 'reserve', args: [1, 5] }
             if (typeof userFunction[input.method] !== 'function') {
                 throw new Error(`Method ${input.method} not found on exported object.`);
             }
             result = await userFunction[input.method](...input.args);
          } else {
             // Standard function call
             if (typeof userFunction === 'function') {
                result = await userFunction(input);
             } else {
                throw new Error("Export is not a function, cannot run standard test.");
             }
          }
          
          let matches = false;
          if (testCase.validator) {
             matches = testCase.validator(result, mockSystem);
          } else {
             matches = JSON.stringify(result) === JSON.stringify(expected);
          }

          if (matches) passedCount++;
          
          results.push({
            input: testCase.input,
            expected,
            actual: result,
            passed: matches
          });
        } catch (err) {
          results.push({
            input: testCase.input,
            expected: testCase.expected,
            error: err.message,
            passed: false
          });
        }
      }

      setTestResults({
        total: currentStepObj.testCases.length,
        passed: passedCount,
        details: results
      });
      
      // Unlock next step if all passed
      if (passedCount === currentStepObj.testCases.length) {
          if (challenge.type === 'multi-step' && currentStep < challenge.steps.length - 1) {
              // Maybe auto-advance or show button?
              capturedLogs.push({ type: 'log', content: '>>> STEP COMPLETED! You can now proceed to the next part.' });
          }
      }

    } catch (err) {
      mockConsole.error(err.toString());
    }

    setLogs(capturedLogs);
  };

  const activeStepObj = challenge.type === 'multi-step' ? challenge.steps[currentStep] : challenge;

  return (
    <div className="backend-runner-container" style={{ display: 'flex', height: '90vh', gap: '20px', flexDirection: 'column' }}>
      
      <div className="instructions-panel" style={{ backgroundColor: '#1e1e1e', padding: '1rem', borderRadius: '8px', border: '1px solid #333', maxHeight: '200px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>{challenge.title} {challenge.type === 'multi-step' && `- Step ${currentStep + 1}: ${activeStepObj.title}`}</h3>
            <ChallengeTimer initialTime={30 * 60} isCountdown={true} />
        </div>
        
        <p style={{ color: '#ccc', whiteSpace: 'pre-wrap' }}>{activeStepObj.description}</p>
        
        {challenge.type === 'multi-step' && (
            <div className="step-progress" style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                {challenge.steps.map((s, i) => (
                    <div key={i} 
                         onClick={() => { if(i <= currentStep) { setCurrentStep(i); setActiveFile(s.fileName); } }}
                         style={{ 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            background: i === currentStep ? '#646cff' : (i < currentStep ? '#2f8542' : '#333'),
                            color: 'white',
                            fontSize: '0.8rem',
                            cursor: i <= currentStep ? 'pointer' : 'default',
                            opacity: i <= currentStep ? 1 : 0.5
                         }}>
                        Step {i + 1}
                    </div>
                ))}
                {testResults && testResults.passed === testResults.total && currentStep < challenge.steps.length - 1 && (
                    <button 
                        onClick={() => {
                            const next = currentStep + 1;
                            setCurrentStep(next);
                            setActiveFile(challenge.steps[next].fileName);
                            setTestResults(null);
                            setLogs([]);
                        }}
                        style={{ marginLeft: 'auto', background: '#2f8542', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Next Step →
                    </button>
                )}
            </div>
        )}
      </div>

      <div className="workspace" style={{ display: 'flex', flex: 1, gap: '20px', minHeight: 0 }}>
        <div className="editor-pane" style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
          <div className="pane-header" style={{ padding: '10px', background: '#252526', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             
             {/* File Tabs */}
             <div className="file-tabs" style={{ display: 'flex', gap: '2px' }}>
                 {challenge.type === 'multi-step' ? (
                     challenge.steps.map((s, i) => (
                         <button key={s.fileName}
                                 onClick={() => { if (i <= currentStep) setActiveFile(s.fileName); }}
                                 style={{
                                     background: activeFile === s.fileName ? '#1e1e1e' : '#333',
                                     color: activeFile === s.fileName ? '#fff' : '#888',
                                     border: 'none',
                                     padding: '6px 12px',
                                     borderTopLeftRadius: '4px',
                                     borderTopRightRadius: '4px',
                                     cursor: i <= currentStep ? 'pointer' : 'not-allowed',
                                     fontSize: '0.9rem'
                                 }}>
                             {s.fileName} {i > currentStep && '🔒'}
                         </button>
                     ))
                 ) : (
                    <span>Solution.js</span>
                 )}
             </div>

             <button className="run-button" onClick={runTests}>Run Tests</button>
          </div>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={files[activeFile] || ''}
            onChange={handleCodeChange}
            theme="vs-dark"
            options={{ minimap: { enabled: false }, fontSize: 14, readOnly: false }} // Could make previous files readonly
          />
        </div>

        <div className="output-pane" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden' }}>
          <div className="pane-header" style={{ padding: '10px', background: '#252526', borderBottom: '1px solid #333' }}>
            Output & Test Results
          </div>
          <div className="output-content" style={{ padding: '1rem', overflow: 'auto', flex: 1, fontFamily: 'monospace' }}>
            
            {testResults && (
              <div className={`test-summary ${testResults.passed === testResults.total ? 'success' : 'failure'}`} 
                   style={{ padding: '10px', marginBottom: '1rem', borderRadius: '4px', backgroundColor: testResults.passed === testResults.total ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)', border: `1px solid ${testResults.passed === testResults.total ? '#4ade80' : '#f87171'}` }}>
                <h4 style={{ margin: 0, color: testResults.passed === testResults.total ? '#4ade80' : '#f87171' }}>
                  Tests: {testResults.passed} / {testResults.total} Passed
                </h4>
              </div>
            )}

            {logs.length > 0 && (
              <div className="console-logs" style={{ marginBottom: '1rem' }}>
                <h5 style={{ margin: '0 0 5px 0', color: '#888' }}>Console Output:</h5>
                {logs.map((log, i) => (
                  <div key={i} className={`log-entry ${log.type}`} style={{ color: log.type === 'error' ? '#f87171' : '#ccc' }}>
                    {log.content}
                  </div>
                ))}
              </div>
            )}

            {testResults && testResults.details.map((result, i) => (
              <div key={i} className="test-case" style={{ marginBottom: '1rem', borderLeft: `3px solid ${result.passed ? '#4ade80' : '#f87171'}`, paddingLeft: '10px' }}>
                <div style={{ fontWeight: 'bold', color: result.passed ? '#4ade80' : '#f87171' }}>
                  Test Case #{i + 1}: {result.passed ? 'PASSED' : 'FAILED'}
                </div>
                {result.error ? (
                   <div style={{ color: '#f87171' }}>Error: {result.error}</div>
                ) : (
                  <>
                    <div style={{ color: '#888' }}>Input: {JSON.stringify(result.input)}</div>
                    <div style={{ color: '#888' }}>Expected: {JSON.stringify(result.expected)}</div>
                    {!result.passed && <div style={{ color: '#f87171' }}>Actual: {JSON.stringify(result.actual)}</div>}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendChallengeRunner;
