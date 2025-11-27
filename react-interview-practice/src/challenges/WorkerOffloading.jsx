import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const WorkerOffloading = () => {
  const initialCode = `
export default function WorkerDemo() {
  const [result, setResult] = React.useState(null);

  const runHeavyTask = () => {
    // This blocks the UI if run on main thread
    // const start = Date.now();
    // while (Date.now() - start < 3000) {} 
    // setResult("Done");
    
    // Move this logic to a Web Worker
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={runHeavyTask}>Run Heavy Task</button>
      <p>Result: {result}</p>
      <input placeholder="Try typing while task runs..." />
    </div>
  );
}
`;

  return (
    <div>
      <h2>Worker Pool & Offloading</h2>
      <Requirements>
        <li>Create a heavy computation (e.g., sorting a huge array or prime number search).</li>
        <li>Observe that running it on the main thread freezes the UI (input becomes unresponsive).</li>
        <li>Move the logic to a Web Worker.</li>
        <li>Verify that the UI remains responsive while the worker calculates the result.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default WorkerOffloading;
