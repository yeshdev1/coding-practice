import React, { useState, useRef } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const UseRefTimerImplementation = () => {
  const [time, setTime] = useState(0);
  // Use useRef to store the interval ID
  const intervalRef = useRef(null);
  const inputRef = useRef(null);
  
  const start = () => {
    // Implement start logic
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
        setTime(t => t + 1);
    }, 1000);
  };

  const stop = () => {
    // Implement stop logic
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Time: {time}</h3>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <hr />
      <input ref={inputRef} type="text" placeholder="Focus me" />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Managing mutable state (interval ID) without triggering re-renders.
        <pre>{`
[ Component ]
   |
   +-- Start() --> window.setInterval(...) -> Returns ID (123)
   |                   |
   |                   v
   +-- [ useRef Container ] (Holds 123)
   |
   +-- Stop() --> window.clearInterval(ref.current)
        `}</pre>
      </p>
      <Requirements>
        <li>Use \`useRef\` to store a mutable interval ID that persists across renders without causing re-renders itself.</li>
        <li>Implement Start/Stop functionality using this ref.</li>
        <li>Add a "Focus Input" button that uses \`useRef\` to access an input DOM element and \`.focus()\` it.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={UseRefTimerImplementation} />
      </div>
    </div>
  );
};

export default UseRefTimer;
