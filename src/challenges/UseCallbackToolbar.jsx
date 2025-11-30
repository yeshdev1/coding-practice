import React, { useState, useCallback, memo } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

// Child component that shouldn't re-render unnecessarily
const Button = memo(({ onClick, children }) => {
  console.log('Rendering button:', children);
  return <button onClick={onClick}>{children}</button>;
});

const UseCallbackToolbarImplementation = () => {
  const [count, setCount] = useState(0);

  // Optimize this function
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(c => c + 1)}>Re-render Parent</button>
      <hr />
      <Button onClick={handleClick}>Click Me (Static)</Button>
    </div>
  );
}

const UseCallbackToolbar = () => {
  const initialCode = `
// Child component that shouldn't re-render unnecessarily
const Button = React.memo(({ onClick, children }) => {
  console.log('Rendering button:', children);
  return <button onClick={onClick}>{children}</button>;
});

export default function Toolbar() {
  const [count, setCount] = React.useState(0);

  // Optimize this function
  const handleClick = () => {
    console.log('Clicked');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(c => c + 1)}>Re-render Parent</button>
      <hr />
      <Button onClick={handleClick}>Click Me (Static)</Button>
    </div>
  );
}
`;

  return (
    <div>
      <h2>useCallback Toolbar</h2>
      <p>
        <strong>Scenario:</strong> Preventing child re-renders by stabilizing function references.
        <pre>{`
[ Parent Component ]
  |
  +-- State Change (Count++) --+
  |                            |
  v                            v
(Re-render)              (Re-render?)
  |                            |
[ Child Button ] <------- [ useCallback(fn) ]
(Props: onClick)               |
  |                            v
  +---- (Reference Same?) ---- YES -> Skip Render
                               NO  -> Re-render
        `}</pre>
      </p>
      <Requirements>
        <li>Create a parent component with a dynamic state (e.g., a counter).</li>
        <li>Pass a callback function to a child component (e.g., a button).</li>
        <li>Use \`React.memo\` on the child and \`useCallback\` on the parent's function.</li>
        <li>Verify that the child does NOT re-render when the parent's counter changes.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={UseCallbackToolbarImplementation} />
      </div>
    </div>
  );
};

export default UseCallbackToolbar;
