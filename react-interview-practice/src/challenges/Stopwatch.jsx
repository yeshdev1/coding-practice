import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const Stopwatch = () => {
  const initialCode = `
export default function Stopwatch() {
  const [time, setTime] = React.useState(0);
  
  // Implement timer logic

  return (
    <div style={{ padding: '20px' }}>
      <h3>{(time / 1000).toFixed(2)}s</h3>
      <button>Start</button>
      <button>Stop</button>
      <button>Reset</button>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Stopwatch</h2>
      <Requirements>
        <li>Display time in MM:SS:ms format.</li>
        <li>Implement Start, Stop, and Reset functionality.</li>
        <li>Ensure the timer is accurate and doesn't drift significantly.</li>
        <li>Add a "Lap" feature to record split times.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default Stopwatch;
