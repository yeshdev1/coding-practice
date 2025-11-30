import React, { useState, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const ProgressBarImplementation = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Progress: {progress}%</h3>
      <div style={{ width: '100%', height: '20px', background: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ 
            width: `${Math.min(Math.max(progress, 0), 100)}%`, 
            height: '100%', 
            background: '#4caf50', 
            transition: 'width 0.3s ease' 
        }} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setProgress(p => Math.min(100, p + 10))}>+10%</button>
        <button onClick={() => setProgress(p => Math.max(0, p - 10))}>-10%</button>
        <button onClick={() => setProgress(0)} style={{ marginLeft: '10px' }}>Reset</button>
      </div>
    </div>
  );
}

const ProgressBar = () => {
  const initialCode = `
export default function ProgressBarDemo() {
  const [progress, setProgress] = React.useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Progress: {progress}%</h3>
      {/* Implement your progress bar component here */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setProgress(p => Math.min(100, p + 10))}>+10%</button>
        <button onClick={() => setProgress(0)} style={{ marginLeft: '10px' }}>Reset</button>
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Progress Bar</h2>
      <p>
        <strong>Scenario:</strong> Visual feedback for long-running tasks (e.g., file upload).
        <pre>{`
0% [--------------------]
25% [=====---------------]
50% [==========----------]
...
100% [====================] (Done!)
      ^
      (Smooth CSS Transition)
        `}</pre>
      </p>
      <Requirements>
        <li>Create a progress bar that visually fills from 0% to 100%.</li>
        <li>Support animation when the value changes.</li>
        <li>Allow control via props (value) or buttons.</li>
        <li>Handle edge cases (negative values, &gt;100%).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={ProgressBarImplementation} />
      </div>
    </div>
  );
};

export default ProgressBar;
