/**
 * Challenge: Virtual DOM / List Virtualization
 * Difficulty: Hard
 * 
 * Requirements:
 * 1. Render a list of 10,000 items without lagging the browser.
 * 2. Only render the items currently visible in the viewport (plus a buffer).
 * 3. Calculate positions using math/absolute positioning.
 */

import Requirements from '../components/Requirements';

export default function VirtualList() {
  return (
    <div>
      <h2>Virtual List / Windowing</h2>
      <Requirements>
            <li>Render a list of 10,000 items without lagging the browser.</li>
            <li>Only render the items currently visible in the viewport (plus a buffer).</li>
            <li>Calculate positions using math/absolute positioning.</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

