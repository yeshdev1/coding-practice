import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const Tabs = () => {
  const initialCode = `
export default function TabsDemo() {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Tabs Component</h3>
      {/* Usage Example:
      <Tabs>
        <Tab label="Home">Home Content</Tab>
        <Tab label="About">About Content</Tab>
      </Tabs>
      */}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Tabs</h2>
      <Requirements>
        <li>Create a reusable Tabs component.</li>
        <li>It should accept children or a configuration array.</li>
        <li>Only render the content of the active tab.</li>
        <li>Style the active tab header differently from inactive ones.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default Tabs;
