import React, { useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Babel from '@babel/standalone';
import ChallengeTimer from './ChallengeTimer';

const defaultExplainer = (line) => {
  const text = line.trim();
  if (!text) return 'Blank line for readability.';
  if (text.startsWith('//')) return 'Developer note: ' + text.replace(/^\/\//, '').trim();
  if (text.startsWith('import')) return 'Imports dependencies used by the component.';
  if (text.includes('useState')) return 'Declares React state to store component data.';
  if (/^export default/.test(text)) return 'Exports the main component so the playground can render it.';
  if (text.startsWith('const')) return 'Declares a constant (function, component, or helper).';
  if (text.startsWith('return')) return 'Begins returning the JSX/UI for this component.';
  if (text.startsWith('<')) return 'Renders JSX to build the UI.';
  return 'Executes: ' + text;
};

const CodePlayground = ({
  initialCode,
  scope = {},
  expectedTime,
  showSolutionPanel = false,
  solutionCode,
  solutionNotes = [],
}) => {
  const [code, setCode] = useState(initialCode || '');
  const [error, setError] = useState(null);
  const [PreviewComponent, setPreviewComponent] = useState(null);
  const [isSolutionOpen, setIsSolutionOpen] = useState(true);
  
  // Extract expected time in minutes from string (e.g., "20m" -> 20)
  const defaultTime = expectedTime ? parseInt(expectedTime) * 60 : 0;
  const effectiveSolutionCode = solutionCode || initialCode || '';
  const lineExplanations = useMemo(() => {
    return effectiveSolutionCode.split('\n').map((line, idx) => ({
      lineNumber: idx + 1,
      code: line,
      explanation: defaultExplainer(line),
    }));
  }, [effectiveSolutionCode]);
  
  // Function to compile and run the code
  const runCode = () => {
    // Track event in Google Analytics
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'run_code_frontend', {
            event_category: 'engagement',
            event_label: 'code_playground'
        });
    }

    setError(null);
    try {
      // 1. Transform JSX/ES6 to ES5
      const compiled = Babel.transform(code, {
        presets: ['react', 'env'],
        filename: 'main.jsx', // Helps babel allow JSX
      }).code;

      // 2. Create a function to execute the code
      // We expose React and other dependencies via scope
      const scopeKeys = Object.keys(scope);
      const scopeValues = Object.values(scope);
      
      // We wrap the user's code to capture the export
      // Strategy: The user code usually has `export default function...`
      // We'll strip 'export default' and 'import' statements (simple regex for now)
      // and force them to assign the component to a variable we can read, 
      // OR we just expect them to define a component named 'App' or return it.
      
      // Simple approach for "React Interview" style: 
      // Assume the last statement is the component or it exports default.
      // Babel transforms `export default` to `exports.default = ...` in CommonJS mode.
      
      // Let's allow `import` statements to be ignored or shimmed
      const cleanCode = compiled.replace(/require\(['"]react['"]\)/g, 'React');

      // Create a "module" object to capture exports
      const exports = {};
      
      // 3. Execute
      // Function(args..., body)
      const func = new Function('React', 'exports', ...scopeKeys, cleanCode);
      
      func(React, exports, ...scopeValues);
      
      // 4. Get the result
      const Result = exports.default;
      
      if (!Result) {
        throw new Error("Your code must 'export default' a React component.");
      }
      
      setPreviewComponent(() => Result);
      
    } catch (err) {
      console.error(err);
      setError(err.toString());
      setPreviewComponent(null);
    }
  };

  const copySolution = (e) => {
    e.stopPropagation();
    if (!effectiveSolutionCode) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(effectiveSolutionCode);
    }
  };

  return (
    <div className="code-playground">
      <div className="playground-stack">
        <div className="editor-section">
          <div className="editor-header">
            <span>Code Editor (JSX)</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ChallengeTimer initialTime={defaultTime} isCountdown={!!expectedTime} />
              <button className="run-button" onClick={runCode}>
                  ▶ Run Code
              </button>
            </div>
          </div>
          <div className="editor-container">
              <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue={initialCode}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
              options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
              }}
              />
          </div>
        </div>

        <div className="preview-section">
          <div className="preview-header">
            <span>Preview Output</span>
          </div>
          <div className="preview-box">
            {error && <div className="error-message"><pre>{error}</pre></div>}
            {!error && PreviewComponent && (
              <div className="sandbox-render">
                <PreviewComponent />
              </div>
            )}
            {!error && !PreviewComponent && (
              <div className="placeholder-text">Click "Run Code" to see the output.</div>
            )}
          </div>
        </div>
      </div>

      {showSolutionPanel && (
        <div className="solution-panel">
          <div className="solution-header" onClick={() => setIsSolutionOpen(!isSolutionOpen)}>
            <div>
              <div className="solution-title">Solution (click to expand)</div>
              <div className="solution-subtitle">Includes copy + line-by-line breakdown</div>
            </div>
            <div className="solution-actions">
              <button className="copy-button danger" onClick={copySolution}>Copy code</button>
              <span className={`chevron ${isSolutionOpen ? 'open' : ''}`}>▾</span>
            </div>
          </div>
          {isSolutionOpen && (
            <div className="solution-body">
              <pre className="solution-code">{effectiveSolutionCode}</pre>
              <div className="line-explanations">
                {lineExplanations.map((item) => (
                  <div className="line-explanation" key={item.lineNumber}>
                    <div className="line-number">#{item.lineNumber}</div>
                    <div className="line-code">{item.code || ' '}</div>
                    <div className="line-detail">{item.explanation}</div>
                  </div>
                ))}
              </div>
              {solutionNotes.length > 0 && (
                <div className="solution-notes">
                  <h4>Design choices</h4>
                  <ul>
                    {solutionNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodePlayground;

