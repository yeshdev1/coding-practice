/**
 * Challenge: Infinite Scroll
 * Difficulty: Medium
 * 
 * Requirements:
 * 1. Render a list of items.
 * 2. When the user scrolls to the bottom, fetch and append more items.
 * 3. Use IntersectionObserver for best performance.
 */

import { fetchInfiniteItems } from '../api/mockApi';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

export default function InfiniteScroll() {
  const initialCode = `
export default function InfiniteList() {
  const [items, setItems] = React.useState(Array.from({ length: 20 }));

  // Implement IntersectionObserver here

  return (
    <div style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc' }}>
      {items.map((_, i) => (
        <div key={i} style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
          Item {i + 1}
        </div>
      ))}
      <div id="loader">Loading more...</div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Infinite Scroll</h2>
      <Requirements>
            <li>Render a list of items.</li>
            <li>When the user scrolls to the bottom, fetch and append more items.</li>
            <li>Use IntersectionObserver for best performance.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
}

