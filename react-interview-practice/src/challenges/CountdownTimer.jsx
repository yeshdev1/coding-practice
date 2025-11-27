import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const CountdownTimer = () => {
  const initialCode = `
export default function Countdown() {
  const [timeLeft, setTimeLeft] = React.useState(10);
  const [isRunning, setIsRunning] = React.useState(false);

  // Implement setInterval logic here

  return (
    <div style={{ padding: '20px' }}>
      <h3>Time Left: {timeLeft}</h3>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setTimeLeft(10)}>Reset</button>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Countdown Timer with Pause/Resume</h2>
      <Requirements>
        <li>Start a countdown from a specified time (e.g., 10s).</li>
        <li>Allow Pausing and Resuming without losing the current time.</li>
        <li>Ensure the timer stops exactly at 0.</li>
        <li>Handle `setInterval` cleanup properly.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default CountdownTimer;
