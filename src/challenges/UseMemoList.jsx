import React, { useState, useMemo } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const UseMemoListImplementation = () => {
  const [text, setText] = useState('');
  const [items] = useState(
    Array.from({ length: 500 }, (_, i) => `Item ${i}`)
  );

  // Optimize this filtering
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => 
        item.toLowerCase().includes(text.toLowerCase())
    );
  }, [items, text]);

  return (
    <div style={{ padding: '20px' }}>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Filter..." />
      <ul>
        {filteredItems.slice(0, 10).map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

const UseMemoList = () => {
  const initialCode = `
export default function ExpensiveList() {
  const [text, setText] = React.useState('');
  const [items, setItems] = React.useState(
    Array.from({ length: 500 }, (_, i) => \`Item \${i}\`)
  );

  // Optimize this filtering
  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <ul>
        {filteredItems.slice(0, 10).map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
`;

  return (
    <div>
      <h2>useMemo Expensive List</h2>
      <p>
        <strong>Scenario:</strong> Optimizing heavy calculations during re-renders.
        <pre>{`
[ Parent Re-renders (e.g. typing in input) ]
           |
           v
   Is (Dependencies) changed?
   /              \\
 YES               NO
  |                |
(Run Sort/Filter)  (Return Cached Result)
  |                |
  v                v
[ Update List ]    [ Skip Calculation ]
        `}</pre>
      </p>
      <Requirements>
        <li>Generate a large list of random numbers or strings.</li>
        <li>Implement sorting and filtering controls.</li>
        <li>Wrap the expensive sort/filter logic in \`useMemo\` to prevent re-calculation on unrelated re-renders (like a text input typing).</li>
        <li>Demonstrate the performance difference (console.log inside the expensive function).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={UseMemoListImplementation} />
      </div>
    </div>
  );
};

export default UseMemoList;
