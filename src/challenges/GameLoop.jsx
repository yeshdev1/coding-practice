import React, { useState, useRef, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const GameLoopImplementation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const boxRef = useRef(null);
  const requestRef = useRef();
  const positionRef = useRef(0);

  const animate = () => {
      positionRef.current = (positionRef.current + 2) % 300; // Move 2px per frame, wrap at 300px
      if (boxRef.current) {
          boxRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }
      requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
      if (isRunning) {
          requestRef.current = requestAnimationFrame(animate);
      } else {
          cancelAnimationFrame(requestRef.current);
      }
      return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning]);

  return (
    <div style={{ padding: '20px' }}>
      <div 
        ref={boxRef}
        style={{ 
          width: '50px', height: '50px', background: 'red',
          transform: 'translateX(0px)',
          marginBottom: '20px'
        }} 
      />
      <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Stop Loop' : 'Start Loop'}
      </button>
    </div>
  );
}

const GameLoop = () => {
  const initialCode = `
export default function GameCanvas() {
  const [position, setPosition] = React.useState(0);
  
  // Use requestAnimationFrame here

  return (
    <div style={{ padding: '20px' }}>
      <div 
        style={{ 
          width: '50px', height: '50px', background: 'red',
          transform: \`translateX(\${position}px)\`
        }} 
      />
      <button>Start Loop</button>
    </div>
  );
}
`;

  return (
    <div>
      <h2>High-Frequency Game Loop</h2>
      <p>
        <strong>Scenario:</strong> Creating a smooth 60fps animation engine.
        <pre>{`
[ Browser Paint ] (16.7ms frame budget)
      ^
      |
(requestAnimationFrame)
      |
      v
[ Update Logic ] -> Move Box: x = x + (velocity * deltaTime)
      |
      v
[ Render ] (Must be fast!)
        `}</pre>
      </p>
      <Requirements>
        <li>Animate a box moving across the screen smoothly.</li>
        <li>Use \`requestAnimationFrame\` instead of \`setInterval\` for 60fps performance.</li>
        <li>Sync the animation frame with React state (or use a ref for the DOM to avoid React re-render overhead, effectively combining with the Direct DOM optimization challenge).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={GameLoopImplementation} />
      </div>
    </div>
  );
};

export default GameLoop;
