import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

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
      <Requirements>
        <li>Build a `useFetch` hook that handles loading, error, and data states.</li>
        <li>**Requirement 1:** Caching (don't refetch if key exists in a global/context cache).</li>
        <li>**Requirement 2:** Race Condition handling (ignore results from old requests if ID changed).</li>
        <li>**Requirement 3:** Cancellation (abort fetch on unmount or new request).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default AdvancedCustomHooks;
