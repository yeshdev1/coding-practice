import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const UseRefTimer = () => {
  const initialCode = `
export default function RefTimer() {
  const [time, setTime] = React.useState(0);
  // Use useRef to store the interval ID
  
  const start = () => {
    // Implement start logic
  };

  const stop = () => {
    // Implement stop logic
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Time: {time}</h3>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
`;

  return (
    <div>
      <h2>useRef Timer & DOM Access</h2>
      <Requirements>
        <li>Use `useRef` to store a mutable interval ID that persists across renders without causing re-renders itself.</li>
        <li>Implement Start/Stop functionality using this ref.</li>
        <li>Add a "Focus Input" button that uses `useRef` to access an input DOM element and `.focus()` it.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default UseRefTimer;
