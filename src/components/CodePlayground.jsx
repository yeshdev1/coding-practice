import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Babel from '@babel/standalone';
import ChallengeTimer from './ChallengeTimer';

const CodePlayground = ({ initialCode, scope = {}, expectedTime, solutionComponent: SolutionComponent }) => {
  const [code, setCode] = useState(initialCode || '');
  const [error, setError] = useState(null);
  const [PreviewComponent, setPreviewComponent] = useState(null);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'solution'
  
  // Extract expected time in minutes from string (e.g., "20m" -> 20)
  const defaultTime = expectedTime ? parseInt(expectedTime) * 60 : 0;
  
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

  return (
    <div className="code-playground">
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
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('preview')}
                >
                    Preview Output
                </button>
                {SolutionComponent && (
                    <button 
                        className={`tab-button ${activeTab === 'solution' ? 'active' : ''}`}
                        onClick={() => setActiveTab('solution')}
                    >
                        Sample Solution
                    </button>
                )}
            </div>
        </div>
        <div className="preview-box">
            {activeTab === 'preview' ? (
                <>
                    {error && <div className="error-message"><pre>{error}</pre></div>}
                    {!error && PreviewComponent && (
                    <div className="sandbox-render">
                        <PreviewComponent />
                    </div>
                    )}
                    {!error && !PreviewComponent && (
                        <div className="placeholder-text">Click "Run Code" to see the output.</div>
                    )}
                </>
            ) : (
                <div className="sandbox-render">
                    {SolutionComponent ? <SolutionComponent /> : <div>No solution available.</div>}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;

