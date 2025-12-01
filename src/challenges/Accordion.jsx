import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const AccordionImplementation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '4px', width: '300px' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: '#eee', 
          padding: '10px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          color: 'black'
        }}
      >
        Accordion Header {isOpen ? '▼' : '▶'}
      </div>
      {isOpen && (
        <div style={{ padding: '10px', background: '#fff', color: 'black' }}>
          This is the accordion content. It is hidden by default and shown when the header is clicked.
        </div>
      )}
    </div>
  );
};

export default function Accordion() {
  const initialCode = `
import React, { useState } from 'react';

export default function Accordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '4px', width: '300px' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: '#eee', 
          padding: '10px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          color: 'black'
        }}
      >
        Accordion Header {isOpen ? '▼' : '▶'}
      </div>
      {isOpen && (
        <div style={{ padding: '10px', background: '#fff', color: 'black' }}>
          This is the accordion content. It is hidden by default and shown when the header is clicked.
        </div>
      )}
    </div>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>Accordion</h2>
      <p>
        <strong>Scenario:</strong> A collapsible section that reveals content when the header is clicked.
      </p>
      <Requirements>
        <li>Header should be always visible and clickable.</li>
        <li>Content should be hidden initially.</li>
        <li>Clicking header toggles content visibility.</li>
        <li>Add a visual indicator (like an arrow) for state.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={AccordionImplementation} />
      </div>
    </div>
  );
}

