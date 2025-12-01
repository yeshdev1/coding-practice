import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const DarkModeToggleImplementation = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: isDark ? '#333' : '#fff', 
      color: isDark ? '#fff' : '#333',
      border: '1px solid #ccc',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    }}>
      <h3>Theme Example</h3>
      <p>This is some content that changes based on the theme.</p>
      <button onClick={() => setIsDark(!isDark)}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default function DarkModeToggle() {
  const initialCode = `
import React, { useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: isDark ? '#333' : '#fff', 
      color: isDark ? '#fff' : '#333',
      border: '1px solid #ccc',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    }}>
      <h3>Theme Example</h3>
      <p>This is some content that changes based on the theme.</p>
      <button onClick={() => setIsDark(!isDark)}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>Dark Mode Toggle</h2>
      <p>
        <strong>Scenario:</strong> A component that switches its visual theme between light and dark modes.
      </p>
      <Requirements>
        <li>Container background and text color should change based on state.</li>
        <li>Button text should reflect the action (e.g. "Switch to Dark").</li>
        <li>Use state to manage the current theme.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={DarkModeToggleImplementation} />
      </div>
    </div>
  );
}

