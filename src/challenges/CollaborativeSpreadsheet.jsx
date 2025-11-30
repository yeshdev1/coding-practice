import React, { useState, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const CollaborativeSpreadsheetImplementation = () => {
  const [data, setData] = useState({ A1: 10, A2: 20 });
  const [formulas, setFormulas] = useState({ C1: '=A1+A2' });

  const handleChange = (cell, value) => {
      // If value starts with =, it's a formula
      if (value.startsWith('=')) {
          setFormulas(prev => ({ ...prev, [cell]: value }));
      } else {
          setData(prev => ({ ...prev, [cell]: Number(value) || 0 }));
          // Clear formula if manually overridden
          setFormulas(prev => {
              const next = { ...prev };
              delete next[cell];
              return next;
          });
      }
  };

  const getCellValue = (cell) => {
      if (formulas[cell]) {
          const expression = formulas[cell].substring(1); // Remove =
          // Very naive parser: A1+A2
          // In real impl, build dependency graph and topological sort
          const tokens = expression.split('+');
          const sum = tokens.reduce((acc, token) => {
              const refVal = data[token.trim()] || 0; 
              // Note: Doesn't handle recursive formulas or deep dependencies here for simplicity
              return acc + refVal;
          }, 0);
          return sum;
      }
      return data[cell] || 0;
  };

  const getDisplayValue = (cell) => {
      if (formulas[cell]) return formulas[cell];
      return data[cell] || '';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Simple Spreadsheet (A1, A2, C1)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '50px 100px', gap: '5px' }}>
          <div>A1</div>
          <input 
            value={getDisplayValue('A1')} 
            onChange={e => handleChange('A1', e.target.value)} 
          />
          
          <div>A2</div>
          <input 
            value={getDisplayValue('A2')} 
            onChange={e => handleChange('A2', e.target.value)} 
          />

          <div>C1</div>
          <input 
            value={getDisplayValue('C1')} 
            onChange={e => handleChange('C1', e.target.value)} 
            placeholder="=A1+A2"
          />
          
          <div>Result</div>
          <div>{getCellValue('C1')}</div>
      </div>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Building a Google Sheets clone. High performance + Complex logic.
        <pre>{`
[ Grid UI (Virtualized) ]
      |
      v
[ Cell A1: "=B1+10" ] <---- (Dependency Graph)
      ^
      |
(Update B1) -> Trigger Re-calc A1 -> Update UI
        `}</pre>
      </p>
      <Requirements>
        <li><strong>Virtualization:</strong> Render a grid of 1,000,000+ cells efficiently.</li>
        <li><strong>Formula Engine:</strong> Parse strings starting with \`=\` and evaluate simple math (e.g., \`=A1+B2\`).</li>
        <li><strong>Reactivity:</strong> Updating cell A1 should automatically update any cell dependent on it (DAG).</li>
        <li><strong>Bonus:</strong> Simulate multi-user collaboration logic (CRDT placeholder).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={CollaborativeSpreadsheetImplementation} />
      </div>
    </div>
  );
};

export default CollaborativeSpreadsheet;
