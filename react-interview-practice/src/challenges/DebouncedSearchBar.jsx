import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

/**
 * Challenge: Debounced Search Bar
 * Difficulty: Medium
 * 
 * Requirements:
 * 1. Input field for search query.
 * 2. Fetch results from a mock API (or real one) as user types.
 * 3. DEBOUNCE the API call (only call after user stops typing for 500ms).
 * 4. Display results.
 */


export default function DebouncedSearchBar() {
  const initialCode = `
export default function Search() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);

  // Implement debounce logic here or inside useEffect

  return (
    <div style={{ padding: '20px' }}>
      <input 
        placeholder="Search..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map(r => <li key={r}>{r}</li>)}
      </ul>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Debounced Search Bar</h2>
      <Requirements>
            <li>Input field for search query.</li>
            <li>Fetch results from a mock API (or real one) as user types.</li>
            <li>DEBOUNCE the API call (only call after user stops typing for 500ms).</li>
            <li>Display results.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
}

