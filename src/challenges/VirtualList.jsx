/**
 * Challenge: Virtual DOM / List Virtualization
 * Difficulty: Hard
 * 
 * Requirements:
 * 1. Render a list of 10,000 items without lagging the browser.
 * 2. Only render the items currently visible in the viewport (plus a buffer).
 * 3. Calculate positions using math/absolute positioning.
 */

import React, { useState, useRef, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const VirtualListImplementation = () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);
  const itemHeight = 30;
  const windowHeight = 300;
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
      items.length - 1, 
      Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight
  }));

  return (
    <div 
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        style={{ height: windowHeight, overflow: 'auto', border: '1px solid white', position: 'relative' }}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, top }) => (
          <div key={index} style={{ height: itemHeight, position: 'absolute', top, width: '100%' }}>
              {item}
          </div>
        ))}
      </div>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Rendering huge datasets efficiently by "faking" the scroll.
        <pre>{`
[ Scroll Container (Height: 300px) ]
    |
    |   (Hidden: Items 0-49)
    |
    +-- [ Visible Area ] (Start: 50, End: 60)
    |   | Item 50 | (Top: 1500px)
    |   | Item 51 |
    |   | ...     |
    |   | Item 60 |
    |
    |   (Hidden: Items 61-1000)
    |
    +-- [ Spacer Div ] (Height: 30,000px)
        `}</pre>
      </p>
      <Requirements>
            <li>Render a list of 10,000 items without lagging the browser.</li>
            <li>Only render the items currently visible in the viewport (plus a buffer).</li>
            <li>Calculate positions using math/absolute positioning.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={VirtualListImplementation} />
      </div>
    </div>
  );
}
