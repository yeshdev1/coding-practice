import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const TabsImplementation = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
      { label: 'Home', content: 'Welcome to the Home tab!' },
      { label: 'About', content: 'This is the About tab.' },
      { label: 'Contact', content: 'Contact us here.' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
          {tabs.map((tab, index) => (
              <button 
                key={index} 
                onClick={() => setActiveTab(index)}
                style={{ 
                    padding: '10px 20px', 
                    border: 'none', 
                    background: activeTab === index ? '#eee' : 'transparent',
                    cursor: 'pointer',
                    fontWeight: activeTab === index ? 'bold' : 'normal'
                }}
              >
                  {tab.label}
              </button>
          ))}
      </div>
      <div style={{ padding: '20px' }}>
          {tabs[activeTab].content}
      </div>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Organize content into switchable panels.
        <pre>{`
[ Tab A ] [ Tab B ] [ Tab C ]
    |
    v
+---------------------------+
|  Content for Tab A        |
|                           |
+---------------------------+
(Only ONE visible at a time)
        `}</pre>
      </p>
      <Requirements>
        <li>Create a reusable Tabs component.</li>
        <li>It should accept children or a configuration array.</li>
        <li>Only render the content of the active tab.</li>
        <li>Style the active tab header differently from inactive ones.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={TabsImplementation} />
      </div>
    </div>
  );
};

export default Tabs;
