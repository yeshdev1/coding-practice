/**
 * Challenge: Traffic Light
 * Difficulty: Medium
 * 
 * Requirements:
 * 1. Display a traffic light (Red, Yellow, Green).
 * 2. Cycle automatically: Red (4s) -> Green (3s) -> Yellow (0.5s) -> Red.
 * 3. Use useEffect and setTimeout.
 */

import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

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
      <h2>Traffic Light</h2>
      <Requirements>
            <li>Display a traffic light (Red, Yellow, Green).</li>
            <li>Cycle automatically: Red (4s) -&gt; Green (3s) -&gt; Yellow (0.5s) -&gt; Red.</li>
            <li>Use useEffect and setTimeout.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
}

