import React, { useState, memo, useCallback } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const Cell = memo(({ id, isActive, onHover }) => {
    // console.log(`Render Cell ${id}`); // Uncomment to see render frequency
    return (
        <div 
            onMouseEnter={() => onHover(id)}
            style={{ 
                width: '10px', 
                height: '10px', 
                background: isActive ? 'red' : '#eee',
                border: '1px solid #ddd'
            }} 
        />
    )
});

const VirtualDomOptimizationImplementation = () => {
  const [activeId, setActiveId] = useState(null);
  
  // We need to ensure onHover is stable to prevent re-renders of Memoized Cells
  const handleHover = useCallback((id) => {
      setActiveId(id);
  }, []);

  // Creating 50x50 grid = 2500 cells
  // This array is static, so it doesn't need to be re-created
  const cells = Array.from({ length: 2500 }, (_, i) => i);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Optimized Grid (Hover me)</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '500px' }}>
          {cells.map(id => (
              <Cell 
                key={id} 
                id={id} 
                isActive={id === activeId} 
                onHover={handleHover} 
              />
          ))}
      </div>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Optimizing a high-frequency update grid (e.g., Pixel Art app or Heatmap).
        <pre>{`
[ Grid Parent ] <--- (State Update: Hover Cell 50)
      |
      v
(Re-render ALL 2500 Cells?) --> [ LAG ]
      |
      v
[ Optimized ]
Only Cell 50 re-renders.
Others use React.memo() -> SKIP
        `}</pre>
      </p>
      <Requirements>
        <li>Create a grid of 2,500 interactive cells (50x50).</li>
        <li>**Approach 1 (Naive):** Global state changes cause the entire grid to re-render. Observe the lag.</li>
        <li>**Approach 2 (Optimized):** Use \`React.memo\` and localized state (or Context selectors) to update only the specific cell.</li>
        <li>**Approach 3 (Direct DOM):** Use Refs to modify the cell color directly, bypassing React's render cycle entirely.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={VirtualDomOptimizationImplementation} />
      </div>
    </div>
  );
};

export default VirtualDomOptimization;
