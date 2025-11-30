import React, { useState, useEffect, useRef } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

// Mock fetch with random delay
const fetchMock = (url) => new Promise(resolve => {
    const id = url.split('/').pop();
    const delay = Math.random() * 2000 + 500; // 0.5 - 2.5s
    setTimeout(() => resolve({ id, title: `Todo ${id} - Delayed ${Math.round(delay)}ms` }), delay);
});

const cache = {};

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
      if (!url) return;
      if (cache[url]) {
          setData(cache[url]);
          return;
      }

      if (abortRef.current) {
          abortRef.current.abort();
      }

      const abortController = new AbortController();
      abortRef.current = abortController;

      setLoading(true);
      setError(null);
      setData(null);

      fetchMock(url)
        .then(res => {
            if (!abortController.signal.aborted) {
                cache[url] = res;
                setData(res);
                setLoading(false);
            }
        })
        .catch(err => {
            if (!abortController.signal.aborted) {
                setError(err);
                setLoading(false);
            }
        });

      return () => {
          abortController.abort();
      };
  }, [url]);

  return { data, loading, error };
}

const AdvancedCustomHooksImplementation = () => {
  const [id, setId] = useState(1);
  const { data, loading } = useFetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setId(id + 1)}>Next Todo ({id + 1})</button>
        <button onClick={() => setId(id > 1 ? id - 1 : 1)}>Prev Todo</button>
      </div>
      {loading ? <div>Loading...</div> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

const AdvancedCustomHooks = () => {
  const initialCode = `
function useFetch(url) {
  // Implement cache, race condition handling, and abortion here
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    fetch(url).then(r => r.json()).then(setData);
  }, [url]);

  return data;
}

export default function HooksDemo() {
  const [id, setId] = React.useState(1);
  const data = useFetch(\`https://jsonplaceholder.typicode.com/todos/\${id}\`);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => setId(id + 1)}>Next Todo</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Advanced Custom Hooks System</h2>
      <p>
        <strong>Scenario:</strong> Building a robust data fetching hook that handles real-world edge cases.
        <pre>{`
[ Component ]
    |
    +-- useFetch(ID: 1) --(Network)--> (Slow Request 1)
    |
(User Clicks 'Next')
    |
    +-- useFetch(ID: 2) --(Network)--> (Fast Request 2)
                                            |
                                            v
                                       [ Update UI (ID: 2) ]
    |
(Request 1 Finally Arrives)
    |
    v
(Ignore/Discard) <-- Race Condition Protection
        `}</pre>
      </p>
      <Requirements>
        <li>Build a \`useFetch\` hook that handles loading, error, and data states.</li>
        <li>**Requirement 1:** Caching (don't refetch if key exists in a global/context cache).</li>
        <li>**Requirement 2:** Race Condition handling (ignore results from old requests if ID changed).</li>
        <li>**Requirement 3:** Cancellation (abort fetch on unmount or new request).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={AdvancedCustomHooksImplementation} />
      </div>
    </div>
  );
};

export default AdvancedCustomHooks;
