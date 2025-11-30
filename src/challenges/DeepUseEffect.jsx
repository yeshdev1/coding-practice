import React, { useState, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

// Mock external system
const externalSystem = {
    value: 0,
    listeners: new Set(),
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    },
    setValue(newValue) {
        if (this.value === newValue) return;
        this.value = newValue;
        this.listeners.forEach(l => l(newValue));
    }
};

const DeepUseEffectImplementation = () => {
  const [data, setData] = useState(0);

  // Sync from External to React
  useEffect(() => {
      const unsubscribe = externalSystem.subscribe((newValue) => {
          setData(newValue);
      });
      return unsubscribe;
  }, []);

  // Sync from React to External
  useEffect(() => {
      externalSystem.setValue(data);
  }, [data]);

  // Simulate external update
  useEffect(() => {
      const interval = setInterval(() => {
          const newVal = Math.floor(Math.random() * 100);
          console.log('External Update:', newVal);
          externalSystem.setValue(newVal);
      }, 5000);
      return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Synced Value: {data}</h3>
      <button onClick={() => setData(d => d + 1)}>Increment Internal</button>
      <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#666' }}>
          (External system updates randomly every 5s)
      </div>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Keeping internal React state in sync with an external, non-React system.
        <pre>{`
[ React State ] <----> [ useEffect ] <----> [ External System ]
    (data)             (Sync Logic)         (window.value / Socket)

Challenge: Avoid Infinite Loops!
Update Internal -> Effect Runs -> Update External -> Trigger Listener -> Update Internal...
        `}</pre>
      </p>
      <Requirements>
        <li>Implement a bi-directional sync between React state and an external system (mocked as a global object or event emitter).</li>
        <li>Ensure that internal updates update the external system.</li>
        <li>Ensure that external updates (simulated via \`setTimeout\`) update the internal state.</li>
        <li>**CRITICAL:** Avoid infinite loops (update -&gt; effect -&gt; set -&gt; update...).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={DeepUseEffectImplementation} />
      </div>
    </div>
  );
};

export default DeepUseEffect;
