import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

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
      <Requirements>
        <li>Animate a box moving across the screen smoothly.</li>
        <li>Use `requestAnimationFrame` instead of `setInterval` for 60fps performance.</li>
        <li>Sync the animation frame with React state (or use a ref for the DOM to avoid React re-render overhead, effectively combining with the Direct DOM optimization challenge).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default GameLoop;
