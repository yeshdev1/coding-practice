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
import CodePlayground from '../components/CodePlayground';

export default function VirtualList() {
  const initialCode = `
export default function VirtualList() {
  const items = Array.from({ length: 1000 }, (_, i) => \`Item \${i}\`);
  const itemHeight = 30;
  const windowHeight = 300;

  // Calculate startIndex and endIndex based on scrollTop

  return (
    <div style={{ height: windowHeight, overflow: 'auto', border: '1px solid white' }}>
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {/* Render only visible items here using absolute positioning */}
        {items.slice(0, 20).map((item, i) => (
          <div key={i} style={{ height: itemHeight }}>{item}</div>
        ))}
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Virtual List / Windowing</h2>
      <Requirements>
            <li>Render a list of 10,000 items without lagging the browser.</li>
            <li>Only render the items currently visible in the viewport (plus a buffer).</li>
            <li>Calculate positions using math/absolute positioning.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
}

