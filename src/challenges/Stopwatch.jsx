import React, { useState, useRef, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const StopwatchImplementation = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (isRunning) {
        intervalRef.current = setInterval(() => {
            setTime(prev => prev + 10);
        }, 10);
    } else {
        clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleReset = () => {
      setIsRunning(false);
      setTime(0);
      setLaps([]);
  };

  const handleLap = () => {
      setLaps([...laps, time]);
  };

  const formatTime = (ms) => {
      const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
      const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
      return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>{formatTime(time)}</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={handleLap} disabled={!isRunning}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <ul>
          {laps.map((lap, i) => <li key={i}>Lap {i + 1}: {formatTime(lap)}</li>)}
      </ul>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Precise time tracking with split capabilities.
        <pre>{`
Display:  00:01:23.45
           |
[Start] -> (Running) -> [Stop] -> (Paused)
             |
           [Lap] -> [ Lap 1: 00:00:10.00 ]
                    [ Lap 2: 00:00:15.00 ]
        `}</pre>
      </p>
      <Requirements>
        <li>Display time in MM:SS:ms format.</li>
        <li>Implement Start, Stop, and Reset functionality.</li>
        <li>Ensure the timer is accurate and doesn't drift significantly.</li>
        <li>Add a "Lap" feature to record split times.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={StopwatchImplementation} />
      </div>
    </div>
  );
};

export default Stopwatch;
