/**
 * Challenge: Traffic Light
 * Difficulty: Medium
 * 
 * Requirements:
 * 1. Display a traffic light (Red, Yellow, Green).
 * 2. Cycle automatically: Red (4s) -> Green (3s) -> Yellow (0.5s) -> Red.
 * 3. Use useEffect and setTimeout.
 */

import React, { useState, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const TrafficLightImplementation = () => {
  const [color, setColor] = useState('red');

  useEffect(() => {
    const duration = color === 'red' ? 4000 : color === 'green' ? 3000 : 500;
    const nextColor = color === 'red' ? 'green' : color === 'green' ? 'yellow' : 'red';

    const timer = setTimeout(() => {
      setColor(nextColor);
    }, duration);

    return () => clearTimeout(timer);
  }, [color]);

  const style = (c) => ({
    width: '50px', height: '50px', borderRadius: '50%', margin: '10px',
    backgroundColor: c, opacity: color === c ? 1 : 0.3,
    transition: 'opacity 0.5s'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#333', padding: '10px', width: '80px', borderRadius: '10px' }}>
      <div style={style('red')} />
      <div style={style('yellow')} />
      <div style={style('green')} />
    </div>
  );
}

export default function TrafficLight() {
  const initialCode = `
export default function TrafficLight() {
  const [color, setColor] = React.useState('red');

  // Implement useEffect cycle here

  const style = (c) => ({
    width: '50px', height: '50px', borderRadius: '50%', margin: '10px',
    backgroundColor: c, opacity: color === c ? 1 : 0.3
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#333', padding: '10px', width: '80px' }}>
      <div style={style('red')} />
      <div style={style('yellow')} />
      <div style={style('green')} />
    </div>
  );
}
`;

  return (
    <div>
      <h2>TrafficLight</h2>
      <p>
        <strong>Scenario:</strong> Simulate a real-world traffic signal controller.
        <pre>{`
   [ Red ]  <-- (4s) --+
      |                |
      v                |
   [ Green ]           |
      |                |
      v                |
   [ Yellow ] --(0.5s)-+
        `}</pre>
      </p>
      <Requirements>
            <li>Display a traffic light (Red, Yellow, Green).</li>
            <li>Cycle automatically: Red (4s) -&gt; Green (3s) -&gt; Yellow (0.5s) -&gt; Red.</li>
            <li>Use useEffect and setTimeout.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={TrafficLightImplementation} />
      </div>
    </div>
  );
}
