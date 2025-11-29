import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const DeepContextPerformance = () => {
  const initialCode = `
const FastContext = React.createContext();

export default function ContextDemo() {
  // The goal is to update a value frequently (like mouse position)
  // WITHOUT re-rendering all children, only the one displaying the value.
  
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  return (
    <FastContext.Provider value={pos}>
      <div 
        style={{ height: '300px', background: '#eee' }} 
        onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
      >
        <h3>Move Mouse Here</h3>
        <Child />
        <ExpensiveChild />
      </div>
    </FastContext.Provider>
  );
}

const Child = () => {
  const pos = React.useContext(FastContext);
  return <p>Mouse: {pos.x}, {pos.y}</p>;
};

const ExpensiveChild = React.memo(() => {
  console.log("Expensive re-render!");
  return <p>I should NOT re-render frequently.</p>;
});
`;

  return (
    <div>
      <h2>Context Performance Optimization</h2>
      <Requirements>
        <li>Create a context that updates very frequently (e.g., mouse coordinates).</li>
        <li>The challenge: The `Provider` updates, causing all consumers to re-render.</li>
        <li>**Task:** Optimize this so that `ExpensiveChild` does **not** re-render even though it is inside the Provider (maybe split context, or pass refs/observables via context instead of values).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default DeepContextPerformance;
