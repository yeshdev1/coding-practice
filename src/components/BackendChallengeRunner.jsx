import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import ChallengeTimer from './ChallengeTimer';
import AiAssistant from './AiAssistant';

const BackendChallengeRunner = ({ challenge }) => {
  // Multi-file support: code is now an object { 'filename': 'content' } if type is 'multi-step'
  // OR string if single-file.
  // To simplify, we'll treat single files as { 'Solution.js': content }
  
  const [files, setFiles] = useState({}); 
  const [activeFile, setActiveFile] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('problem'); // 'problem' | 'concepts' | 'ai'
  const [language, setLanguage] = useState('javascript'); // 'javascript' | 'python'
  
  const [logs, setLogs] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [showConceptsPopover, setShowConceptsPopover] = useState(false);
  const [pyodide, setPyodide] = useState(null);

  // Initialize Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
        if (!window.loadPyodide) return;
        if (pyodide) return;
        
        try {
            const py = await window.loadPyodide();
            setPyodide(py);
            console.log("Pyodide loaded successfully");
        } catch (err) {
            console.error("Failed to load Pyodide:", err);
        }
    };
    
    if (language === 'python') {
        loadPyodide();
    }
  }, [language, pyodide]);

  // Initialize state based on challenge type
  useEffect(() => {
    setLogs([]);
    setTestResults(null);
    setCurrentStep(0);
    setActiveTab('problem');
    setLanguage('javascript'); // Default to JS on new challenge
    
    // Check if user has seen the concepts popover
    const hasSeenConcepts = localStorage.getItem('hasSeenConceptsPopover');
    if (!hasSeenConcepts) {
        setShowConceptsPopover(true);
    }
    
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

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    
    // Reset files for the new language
    // For now, we generate default Python code if switching to Python
    if (newLang === 'python') {
        if (challenge.type === 'multi-step') {
             const newFiles = {};
             challenge.steps.forEach(step => {
                 const baseName = step.fileName.replace('.js', '');
                 const pyName = baseName + '.py';
                 newFiles[pyName] = `# ${step.title}\n# Write your Python solution here\n\ndef solution(*args):\n    pass\n`;
             });
             setFiles(newFiles);
             setActiveFile(Object.keys(newFiles)[0]);
        } else {
             setFiles({ 'Solution.py': 'def solution(args):\n    # Your Python code here\n    return None\n' });
             setActiveFile('Solution.py');
        }
    } else if (newLang === 'go') {
        const goTemplate = `package main

import (
	"encoding/json"
	"fmt"
	"os"
)

// Input data structure - modify as needed for the challenge
// For example, if input is { "id": 1 }, define:
// type Input struct {
//    ID int \`json:"id"\`
// }
// Or use map[string]interface{} for generic handling
type Input interface{}

func solution(input Input) interface{} {
	// Write your solution here
	return "implemented me"
}

func main() {
	// READ INPUT from STDIN
	var input Input
	if err := json.NewDecoder(os.Stdin).Decode(&input); err != nil {
		// Handle primitive inputs (like "start") if JSON fails
		// or just ignore for now
	}

	// EXECUTE SOLUTION
	result := solution(input)

	// WRITE OUTPUT to STDOUT
	json.NewEncoder(os.Stdout).Encode(result)
}
`;
        setFiles({ 'main.go': goTemplate });
        setActiveFile('main.go');
    } else {
        // Switch back to JS (reload from challenge data)
        if (challenge.type === 'multi-step') {
            const initialFiles = {};
            challenge.steps.forEach(step => {
              initialFiles[step.fileName] = step.initialCode || '';
            });
            setFiles(initialFiles);
            setActiveFile(challenge.steps[0].fileName);
          } else {
            setFiles({ 'Solution.js': challenge.initialCode || '' });
            setActiveFile('Solution.js');
          }
    }
  };

  const handleCodeChange = (value) => {
    setFiles(prev => ({ ...prev, [activeFile]: value }));
  };

  const runTests = async () => {
    // Track event in Google Analytics
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'run_tests_backend', {
            event_category: 'engagement',
            event_label: challenge.id,
            language: language
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

    if (language === 'python') {
        if (!pyodide) {
            mockConsole.error("Pyodide is still loading, please wait...");
            setLogs(capturedLogs);
            return;
        }

        try {
            // Reset Pyodide environment if possible or just re-register
            // Ideally we'd restart the worker but here we just clear globals if we could.
            // For simplicity, we just overwrite files.
            
            // Register system mock
            // We create a wrapper because Pyodide might need explicit conversion
            pyodide.registerJsModule("system", mockSystem);
            
            // Redirect stdout/stderr
            pyodide.setStdout({ batched: (msg) => mockConsole.log(msg) });
            pyodide.setStderr({ batched: (msg) => mockConsole.error(msg) });

            // Write files to virtual FS
            const fileNames = Object.keys(files);
            for (const fileName of fileNames) {
                pyodide.FS.writeFile(fileName, files[fileName]);
            }

            // Run the active file
            // We import it to execute it
            const activeFileName = activeFile.replace('.py', '');
            await pyodide.runPythonAsync(`
import importlib
import sys

# Clear cache to allow re-importing modified modules
if '${activeFileName}' in sys.modules:
    del sys.modules['${activeFileName}']

import ${activeFileName}
`);
            
            // Get solution function
            const pyModule = pyodide.globals.get('sys').modules.get(activeFileName);
            const solutionFn = pyModule?.solution;
            
            if (!solutionFn) {
                throw new Error(`File ${activeFile} must define a 'solution' function.`);
            }

            // Run Test Cases
            const currentStepObj = challenge.type === 'multi-step' ? challenge.steps[currentStep] : challenge;
            const results = [];
            let passedCount = 0;

            for (const testCase of currentStepObj.testCases) {
                 try {
                     // Prepare input
                     let input = testCase.input;
                     let pyResult;

                     // Handle different input modes if needed, generally we pass as args
                     // If mode is method_call, we might need to call a class method?
                     // Python support for 'method_call' test cases might need specific handling
                     
                     if (testCase.mode === 'method_call') {
                         // e.g. input: { method: 'reserve', args: [1, 5] }
                         // Python: solution object has method?
                         // Or solution is a class instance?
                         // For now assuming solution is the entry point function or object
                         // If solution is a module/class, we need to adapt.
                         // To keep it simple for now: We call solution() with input.
                         // Update: JS version supports exporting an object.
                         
                         const method = input.method;
                         const args = input.args;
                         
                         // Check if solutionFn has attribute 'method'
                         if (solutionFn[method]) {
                             // It's an object/module with functions
                             pyResult = await solutionFn[method](...args);
                         } else {
                             // Maybe solutionFn is a class?
                             // This is getting complex for generic Python support.
                             // Fallback: Call solution(input)
                             pyResult = await solutionFn(input);
                         }
                     } else {
                         // Standard function call
                         // We pass input. If input is array, we pass as *args? 
                         // Or just single arg? JS passes single arg usually unless spread.
                         // Let's pass single arg to match JS signature `solution(args)`
                         // If input is {table, id}, we pass a JS object (proxy in Py)
                         
                         pyResult = await solutionFn(input);
                     }
                     
                     // Convert PyProxy to JS
                     let jsResult = pyResult;
                     if (pyResult && pyResult.toJs) {
                         jsResult = pyResult.toJs({dict_converter: Object.fromEntries});
                     }
                     
                     let matches = false;
                     if (testCase.validator) {
                        matches = testCase.validator(jsResult, mockSystem);
                     } else {
                        matches = JSON.stringify(jsResult) === JSON.stringify(testCase.expected);
                     }

                     if (matches) passedCount++;
                     
                     results.push({
                        input: testCase.input,
                        expected: testCase.expected,
                        actual: jsResult,
                        passed: matches
                     });

                 } catch (err) {
                     results.push({
                        input: testCase.input,
                        expected: testCase.expected,
                        error: err.toString(),
                        passed: false
                     });
                 }
            }

            setTestResults({
                total: currentStepObj.testCases.length,
                passed: passedCount,
                details: results
            });

        } catch (err) {
            mockConsole.error(err.toString());
        }
        
        setLogs(capturedLogs);
        return;
    }

    if (language === 'go') {
        const currentStepObj = challenge.type === 'multi-step' ? challenge.steps[currentStep] : challenge;
        const results = [];
        let passedCount = 0;
        
        // Use the first file as the main file
        const mainFileContent = Object.values(files)[0];

        for (const testCase of currentStepObj.testCases) {
             try {
                 const inputStr = JSON.stringify(testCase.input);
                 
                 // Call Piston API
                 const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                         language: 'go',
                         version: '1.18.0',
                         files: [
                             { content: mainFileContent }
                         ],
                         stdin: inputStr
                     })
                 });

                 const data = await response.json();
                 
                 if (data.message) {
                     throw new Error(data.message);
                 }

                 if (data.run && data.run.stderr) {
                     // Check if it's just a build output or error
                     // Go run often prints nothing on stderr if success, but build errors show up
                     if (data.run.code !== 0) {
                        throw new Error(data.run.stderr);
                     }
                 }

                 let outputStr = data.run.stdout.trim();
                 
                 // Log execution
                 capturedLogs.push({ type: 'log', content: `Input: ${inputStr}` });
                 if (outputStr) capturedLogs.push({ type: 'log', content: `Output: ${outputStr}` });
                 if (data.run.stderr) capturedLogs.push({ type: 'error', content: data.run.stderr });

                 let actual;
                 try {
                    actual = JSON.parse(outputStr);
                 } catch (e) {
                    void e;
                    actual = outputStr; // Fallback to raw string if not JSON
                 }

                 let matches = false;
                 // Basic equality check for Go results
                 // Normalize expected if it's an object
                 const expectedStr = JSON.stringify(testCase.expected);
                 const actualStr = JSON.stringify(actual);
                 
                 if (expectedStr === actualStr) {
                     matches = true;
                 } else if (actual === testCase.expected) {
                     matches = true;
                 }

                 if (matches) passedCount++;

                 results.push({
                    input: testCase.input,
                    expected: testCase.expected,
                    actual: actual,
                    passed: matches
                 });

             } catch (err) {
                 capturedLogs.push({ type: 'error', content: err.toString() });
                 results.push({
                    input: testCase.input,
                    expected: testCase.expected,
                    error: err.message || "Execution failed",
                    passed: false
                 });
             }
        }

        setTestResults({
            total: currentStepObj.testCases.length,
            passed: passedCount,
            details: results
        });
        setLogs(capturedLogs);
        return;
    }

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
    <div className="backend-runner-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '90vh', gap: '10px' }}>
        
        {/* Top Level Tabs */}
        <div className="runner-tabs" style={{ display: 'flex', gap: '10px', padding: '0 10px', position: 'relative' }}>
            <button 
                className={`tab-button ${activeTab === 'problem' ? 'active' : ''}`}
                onClick={() => setActiveTab('problem')}
            >
                Problem & Code
            </button>
            {challenge.concepts && (
                <div style={{ position: 'relative' }}>
                    <button 
                        className={`tab-button ${activeTab === 'concepts' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('concepts');
                            if (showConceptsPopover) {
                                setShowConceptsPopover(false);
                                localStorage.setItem('hasSeenConceptsPopover', 'true');
                            }
                            if (typeof window.gtag === 'function') {
                                window.gtag('event', 'view_concepts', {
                                    event_category: 'engagement',
                                    event_label: challenge.id
                                });
                            }
                        }}
                    >
                        Key Concepts & Resources
                    </button>
                    {showConceptsPopover && (
                        <div style={{
                            position: 'absolute',
                            top: '120%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#646cff',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            zIndex: 100,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            animation: 'float 2s ease-in-out infinite'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-6px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 0,
                                height: 0,
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderBottom: '6px solid #646cff'
                            }} />
                            Check out key concepts here! ✨
                        </div>
                    )}
                </div>
            )}
            <button 
                className={`tab-button ${activeTab === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai')}
            >
                AI Code Review (Beta)
            </button>
        </div>

      {activeTab === 'problem' && (
        <div className="backend-runner-container" style={{ display: 'flex', flex: 1, gap: '20px', flexDirection: 'column', minHeight: 0 }}>
        
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
                        challenge.steps.map((s, i) => {
                            const fileName = language === 'python' ? s.fileName.replace('.js', '.py') : s.fileName;
                            return (
                                <button key={fileName}
                                        onClick={() => { if (i <= currentStep) setActiveFile(fileName); }}
                                        style={{
                                            background: activeFile === fileName ? '#1e1e1e' : '#333',
                                            color: activeFile === fileName ? '#fff' : '#888',
                                            border: 'none',
                                            padding: '6px 12px',
                                            borderTopLeftRadius: '4px',
                                            borderTopRightRadius: '4px',
                                            cursor: i <= currentStep ? 'pointer' : 'not-allowed',
                                            fontSize: '0.9rem'
                                        }}>
                                    {fileName} {i > currentStep && '🔒'}
                                </button>
                            );
                        })
                    ) : (
                        <span>{language === 'python' ? 'Solution.py' : 'Solution.js'}</span>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select 
                        value={language} 
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        style={{
                            background: '#333',
                            color: 'white',
                            border: '1px solid #444',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '0.9rem'
                        }}
                    >
                        <option value="javascript">JavaScript (Node.js)</option>
                        <option value="python">Python (Pyodide)</option>
                        <option value="go">Go (Piston API)</option>
                    </select>
                    <button className="run-button" onClick={runTests}>Run Tests</button>
                </div>
            </div>
            <Editor
                height="100%"
                language={language === 'go' ? 'go' : (language === 'python' ? 'python' : 'javascript')}
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
      )}

      {activeTab === 'concepts' && (
        <div className="concepts-container" style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#1e1e1e', borderRadius: '8px', border: '1px solid #333' }}>
            <h2 style={{ marginTop: 0, borderBottom: '1px solid #444', paddingBottom: '10px' }}>Key Concepts & Resources</h2>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>
                Understanding these concepts is crucial for solving this challenge and for system design interviews.
            </p>
            
            {challenge.concepts ? (
                <div style={{ display: 'grid', gap: '2rem' }}>
                    {challenge.concepts.map((concept, idx) => (
                        <div key={idx} style={{ background: '#252526', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
                            <h3 style={{ marginTop: 0, color: '#fff', fontSize: '1.3rem' }}>{concept.title}</h3>
                            <p style={{ color: '#ccc', lineHeight: 1.6, fontSize: '1rem' }}>{concept.description}</p>
                            
                            {concept.links && concept.links.length > 0 && (
                                <div style={{ marginTop: '1rem' }}>
                                    <strong style={{ color: '#888', fontSize: '0.9rem', textTransform: 'uppercase' }}>Deep Dive Resources:</strong>
                                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
                                        {concept.links.map((link, lIdx) => (
                                            <li key={lIdx} style={{ marginBottom: '0.5rem' }}>
                                                <a 
                                                    href={link.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    style={{ color: '#646cff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
                                                >
                                                    <span>📄</span> {link.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', color: '#666', marginTop: '20%' }}>
                    No specific concepts listed for this challenge. Focus on the algorithmic logic!
                </div>
            )}
        </div>
      )}

      {activeTab === 'ai' && (
        <AiAssistant 
            code={files[activeFile] || ''} 
            problemDescription={activeStepObj.description}
            language={language}
        />
      )}
    </div>
  );
};

export default BackendChallengeRunner;
