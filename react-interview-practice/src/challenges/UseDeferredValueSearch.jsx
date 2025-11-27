import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const UseDeferredValueSearch = () => {
  const initialCode = `
export default function DeferredSearch() {
  const [query, setQuery] = React.useState('');
  // Use useDeferredValue for the list rendering

  // Dummy heavy list generation
  const list = React.useMemo(() => {
    return Array.from({ length: 5000 }, (_, i) => \`Result \${i} for \${query}\`);
  }, [query]);

  return (
    <div style={{ padding: '20px' }}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Type fast..." />
      <ul>
        {list.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
`;

  return (
    <div>
      <h2>useDeferredValue Search</h2>
      <Requirements>
        <li>Implement a search input that filters a large list (simulated heavy calculation).</li>
        <li>Use `useDeferredValue` to defer the update of the list, keeping the input field responsive.</li>
        <li>Visualize the "stale" state (e.g., dim the old list while the new one calculates).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default UseDeferredValueSearch;
