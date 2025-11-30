import React, { useState, useEffect, useRef } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const CountdownTimerImplementation = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
        intervalRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(intervalRef.current);
                    setIsRunning(false);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
    } else {
        clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Time Left: {timeLeft}</h3>
      <button onClick={() => setIsRunning(!isRunning)} disabled={timeLeft === 0}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => {
          setIsRunning(false);
          setTimeLeft(10);
      }} style={{ marginLeft: '10px' }}>Reset</button>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> A timer that maintains state across interruptions.
        <pre>{`
State: { time: 10, isRunning: false }

[Start] -> isRunning: true
            |
            v
     (Tick -1s) -> time: 9 -> time: 8 ...
            |
[Pause] -> isRunning: false (Stop Ticking)
            |
[Resume] -> isRunning: true (Continue from 8)
        `}</pre>
      </p>
      <Requirements>
        <li>Start a countdown from a specified time (e.g., 10s).</li>
        <li>Allow Pausing and Resuming without losing the current time.</li>
        <li>Ensure the timer stops exactly at 0.</li>
        <li>Handle \`setInterval\` cleanup properly.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground 
            initialCode={initialCode} 
            solutionComponent={CountdownTimerImplementation} 
            problemDescription="Implement a countdown timer that starts from a specified time (e.g. 10s), allows pausing and resuming, stops at 0, and handles setInterval cleanup properly."
         />
      </div>
    </div>
  );
};

export default CountdownTimer;
