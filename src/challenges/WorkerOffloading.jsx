import React, { useState, useEffect, useRef } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const WorkerOffloadingImplementation = () => {
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');
  const workerRef = useRef(null);

  useEffect(() => {
      // Create a blob worker
      const workerCode = `
        self.onmessage = function(e) {
            const start = Date.now();
            // Simulate heavy work
            while (Date.now() - start < 3000) {} 
            self.postMessage("Done processing!");
        }
      `;
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      workerRef.current = new Worker(URL.createObjectURL(blob));

      workerRef.current.onmessage = (e) => {
          setResult(e.data);
          setStatus('idle');
      };

      return () => workerRef.current.terminate();
  }, []);

  const runHeavyTask = () => {
      setResult(null);
      setStatus('processing');
      workerRef.current.postMessage('start');
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={runHeavyTask} disabled={status === 'processing'}>
          {status === 'processing' ? 'Processing...' : 'Run Heavy Task'}
      </button>
      <p>Result: {result}</p>
      <input placeholder="Try typing while task runs..." style={{ width: '100%' }} />
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Keeping the UI responsive during heavy data processing.
        <pre>{`
[ Main Thread ]
(UI, Inputs, Animations)
      |
      +--- (Msg: "Start") ---> [ Web Worker Thread ]
      |                        (Heavy Math / Sorting)
      |                               |
      |                               |
      +<-- (Msg: "Result") -----------+
      |
[ Update UI ]
        `}</pre>
      </p>
      <Requirements>
        <li>Create a heavy computation (e.g., sorting a huge array or prime number search).</li>
        <li>Observe that running it on the main thread freezes the UI (input becomes unresponsive).</li>
        <li>Move the logic to a Web Worker.</li>
        <li>Verify that the UI remains responsive while the worker calculates the result.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={WorkerOffloadingImplementation} />
      </div>
    </div>
  );
};

export default WorkerOffloading;
