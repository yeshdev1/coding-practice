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

export default function TrafficLight() {
  return (
    <div>
      <h2>Traffic Light</h2>
      <Requirements>
            <li>Display a traffic light (Red, Yellow, Green).</li>
            <li>Cycle automatically: Red (4s) -&gt; Green (3s) -&gt; Yellow (0.5s) -&gt; Red.</li>
            <li>Use useEffect and setTimeout.</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

