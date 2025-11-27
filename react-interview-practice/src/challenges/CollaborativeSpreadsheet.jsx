import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const CollaborativeSpreadsheet = () => {
  const initialCode = `
export default function Spreadsheet() {
  // This is an expert level challenge.
  // Start by rendering a simple virtualized grid.
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Spreadsheet</h3>
      <div style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}>
        {/* Grid goes here */}
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Collaborative Spreadsheet Engine (Expert)</h2>
      <Requirements>
        <li><strong>Virtualization:</strong> Render a grid of 1,000,000+ cells efficiently.</li>
        <li><strong>Formula Engine:</strong> Parse strings starting with `=` and evaluate simple math (e.g., `=A1+B2`).</li>
        <li><strong>Reactivity:</strong> Updating cell A1 should automatically update any cell dependent on it (DAG).</li>
        <li><strong>Bonus:</strong> Simulate multi-user collaboration logic (CRDT placeholder).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default CollaborativeSpreadsheet;
