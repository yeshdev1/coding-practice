import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const ToggleButtonImplementation = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      style={{
        backgroundColor: isOn ? 'green' : 'red',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};

export default function ToggleButton() {
  const initialCode = `
import React, { useState } from 'react';

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      style={{
        backgroundColor: isOn ? 'green' : 'red',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>Toggle Button</h2>
      <p>
        <strong>Scenario:</strong> Create a simple button that toggles between an "ON" state (green) and an "OFF" state (red).
      </p>
      <Requirements>
        <li>Clicking the button should toggle the state.</li>
        <li>Text should be "ON" when active, "OFF" when inactive.</li>
        <li>Background color should be green when active, red when inactive.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={ToggleButtonImplementation} />
      </div>
    </div>
  );
}

