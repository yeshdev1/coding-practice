/**
 * Challenge: Infinite Scroll
 * Difficulty: Medium
 * 
 * Requirements:
 * 1. Render a list of items.
 * 2. When the user scrolls to the bottom, fetch and append more items.
 * 3. Use IntersectionObserver for best performance.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchInfiniteItems } from '../api/mockApi';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const InfiniteScrollImplementation = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems(prev => [
        ...prev, 
        ...Array.from({ length: 10 }, (_, i) => `Item ${prev.length + i + 1}`)
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}>
      {items.map((item, i) => {
        if (items.length === i + 1) {
          return <div ref={lastItemRef} key={i} style={{ padding: '20px', borderBottom: '1px solid #eee' }}>{item}</div>
        } else {
          return <div key={i} style={{ padding: '20px', borderBottom: '1px solid #eee' }}>{item}</div>
        }
      })}
      {loading && <div id="loader">Loading more...</div>}
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Load content efficiently as the user consumes it, just like a social feed.
        <pre>{`
[ Viewport ]
|  Item 1  |
|  Item 2  |
|  Item 3  |
|__________|
  [Loader] <--- (Observer detects visibility)
     |
     v
(Fetch More) -> [ Item 4, Item 5, ... ] -> Append to List
        `}</pre>
      </p>
      <Requirements>
            <li>Render a list of items.</li>
            <li>When the user scrolls to the bottom, fetch and append more items.</li>
            <li>Use IntersectionObserver for best performance.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={InfiniteScrollImplementation} />
      </div>
    </div>
  );
}
