import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const UseTransitionTabs = () => {
  const initialCode = `
export default function TransitionTabs() {
  const [tab, setTab] = React.useState('home');
  // Use useTransition here

  const renderTab = () => {
    // Simulate slow render
    const start = performance.now();
    while (performance.now() - start < 20) {} 
    return <div>Content for {tab}</div>;
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setTab('home')}>Home</button>
        <button onClick={() => setTab('posts')}>Posts (Slow)</button>
        <button onClick={() => setTab('contact')}>Contact</button>
      </div>
      {renderTab()}
    </div>
  );
}
`;

  return (
    <div>
      <h2>useTransition Tabs</h2>
      <Requirements>
        <li>Create a tab system where one tab renders very slowly (simulate lag).</li>
        <li>Use `useTransition` when switching tabs to keep the UI interactive.</li>
        <li>Show a "Pending..." or loading indicator while the transition is happening.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default UseTransitionTabs;
