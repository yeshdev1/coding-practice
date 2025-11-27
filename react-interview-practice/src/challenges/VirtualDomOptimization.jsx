import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const VirtualDomOptimization = () => {
  const initialCode = `
export default function OptimizationChallenge() {
  // 1. Implement Naive (Laggy) version
  // 2. Implement Optimized (Memo) version
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Render Stress Test</h3>
      {/* Grid of 50x50 cells */}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Virtual DOM vs Direct DOM Optimization</h2>
      <Requirements>
        <li>Create a grid of 2,500 interactive cells (50x50).</li>
        <li>**Approach 1 (Naive):** Global state changes cause the entire grid to re-render. Observe the lag.</li>
        <li>**Approach 2 (Optimized):** Use `React.memo` and localized state (or Context selectors) to update only the specific cell.</li>
        <li>**Approach 3 (Direct DOM):** Use Refs to modify the cell color directly, bypassing React's render cycle entirely.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default VirtualDomOptimization;
