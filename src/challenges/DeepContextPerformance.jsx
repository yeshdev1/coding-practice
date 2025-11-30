import React, { useState, createContext, useContext, memo } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const FastContext = createContext(null);

const FastProvider = ({ children }) => {
    const [state, setState] = useState({ x: 0, y: 0 });
    return (
        <FastContext.Provider value={{ state, setState }}>
            {children}
        </FastContext.Provider>
    );
};

// Optimization: Separate context or use a selector pattern?
// A common pattern is to pass a mutable ref or an observable in Context,
// or split context into StateContext and DispatchContext.
// But for "DeepContextPerformance" asking to optimize frequent updates,
// using `children` prop or `React.memo` on intermediate components is key.
// HOWEVER, if `Child` consumes context, it WILL re-render on every update.
// `ExpensiveChild` does NOT consume context, so if it's memoized, it should be fine IF parent doesn't re-render it.
// But `ContextDemo` (Parent) has state `pos`, so it re-renders on every mouse move.
// This causes `ExpensiveChild` to re-render unless we stabilize its props/element.

// Let's implement the optimized version where Parent component uses composition
// or we move state DOWN into a provider that doesn't wrap everything?
// Actually, the Requirement says "ExpensiveChild does NOT re-render even though it is inside the Provider".
// This implies `ContextDemo` (which renders Provider) shouldn't re-render everything.
// We can achieve this by pushing state into a separate component `MouseTracker` 
// and passing `ExpensiveChild` as `children` to it? No, `Context` updates trigger consumers.
// ExpensiveChild is NOT a consumer. But if `ContextDemo` re-renders, it re-creates `<ExpensiveChild />`.
// We need `React.memo(ExpensiveChild)`.

const DeepContextPerformanceImplementation = () => {
  // To optimize: The Provider component should hold the state, but NOT re-render children that are passed as props.
  return (
      <OptimizedProvider>
          <div style={{ height: '300px', background: '#eee', position: 'relative' }}>
            <h3>Move Mouse Here (Optimized)</h3>
            <ChildConsumer />
            <ExpensiveChild />
          </div>
      </OptimizedProvider>
  )
}

const OptimizedProvider = ({ children }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    return (
        <FastContext.Provider value={pos}>
            <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })} style={{ height: '100%' }}>
                {children}
            </div>
        </FastContext.Provider>
    );
}

const ChildConsumer = () => {
    const pos = useContext(FastContext);
    return <p>Mouse: {pos.x}, {pos.y}</p>;
}

const ExpensiveChild = memo(() => {
    console.log("Expensive Render (Should run once)");
    return <div style={{ border: '1px solid red', padding: '10px' }}>I am heavy and static.</div>;
});

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
      <p>
        <strong>Scenario:</strong> Preventing context "thrashing" where frequent updates cause app-wide lag.
        <pre>{`
[ Provider (State: {x, y}) ] <--- (Updates 60fps on MouseMove)
      |
      +---> [ Child A (Consumes Context) ] -> Needs Update (OK)
      |
      +---> [ Child B (Expensive) ] -> Should SKIP Render!
                                       (But Provider changed, so it renders?)
        `}</pre>
      </p>
      <Requirements>
        <li>Create a context that updates very frequently (e.g., mouse coordinates).</li>
        <li>The challenge: The \`Provider\` updates, causing all consumers to re-render.</li>
        <li>**Task:** Optimize this so that \`ExpensiveChild\` does **not** re-render even though it is inside the Provider (maybe split context, or pass refs/observables via context instead of values).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={DeepContextPerformanceImplementation} />
      </div>
    </div>
  );
};

export default DeepContextPerformance;
