import React, { useState, useEffect } from 'react';
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

const DebouncedSearchBarImplementation = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        // Mock API call
        setResults([`Result for ${query} 1`, `Result for ${query} 2`]);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
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
      <p>
        <strong>Scenario:</strong> Prevent API spam by waiting for the user to stop typing.
        <pre>{`
User Types: "R"... "Re"... "Rea"... "Reac"... "React"
Time:       0ms    100ms   200ms    300ms     400ms
             |       |       |        |         |
        (Cancel) (Cancel) (Cancel) (Cancel)  (Wait 500ms)
                                                |
                                                v
                                          [ Call API ]
        `}</pre>
      </p>
      <Requirements>
            <li>Input field for search query.</li>
            <li>Fetch results from a mock API (or real one) as user types.</li>
            <li>DEBOUNCE the API call (only call after user stops typing for 500ms).</li>
            <li>Display results.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={DebouncedSearchBarImplementation} />
      </div>
    </div>
  );
}
