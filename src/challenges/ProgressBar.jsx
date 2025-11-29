import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

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
      <Requirements>
        <li>Create a progress bar that visually fills from 0% to 100%.</li>
        <li>Support animation when the value changes.</li>
        <li>Allow control via props (value) or buttons.</li>
        <li>Handle edge cases (negative values, >100%).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default ProgressBar;
