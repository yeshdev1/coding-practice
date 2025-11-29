import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const DeepUseEffect = () => {
  const initialCode = `
export default function SyncEngine() {
  const [data, setData] = React.useState(0);

  // Simulate external source (e.g., a global variable or subscription)
  // Implement useEffect to sync 'data' with 'window.externalValue' bi-directionally
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Synced Value: {data}</h3>
      <button onClick={() => setData(d => d + 1)}>Increment Internal</button>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Deep useEffect Synchronization</h2>
      <Requirements>
        <li>Implement a bi-directional sync between React state and an external system (mocked as a global object or event emitter).</li>
        <li>Ensure that internal updates update the external system.</li>
        <li>Ensure that external updates (simulated via `setTimeout`) update the internal state.</li>
        <li>**CRITICAL:** Avoid infinite loops (update -&gt; effect -&gt; set -&gt; update...).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default DeepUseEffect;
