import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const ShowHidePasswordImplementation = () => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <input
        type={show ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        style={{ padding: '8px' }}
      />
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default function ShowHidePassword({ showSolutionPanel = false }) {
  const initialCode = `
import React, { useState } from 'react';

export default function ShowHidePassword() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <input
        type={show ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        style={{ padding: '8px' }}
      />
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>Show/Hide Password</h2>
      <p>
        <strong>Scenario:</strong> A standard password field with a button to toggle visibility of the text.
      </p>
      <Requirements>
        <li>Input field should mask text by default (dots/stars).</li>
        <li>A button next to it should toggle between "Show" and "Hide".</li>
        <li>When "Show" is active, the actual text should be visible.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
        <CodePlayground
          initialCode={initialCode}
          solutionComponent={ShowHidePasswordImplementation}
          showSolutionPanel={showSolutionPanel}
          solutionCode={initialCode}
          solutionNotes={[
            'Boolean state toggles input type, keeping logic minimal and readable.',
            'Button label derives from the same state to avoid duplication.',
            'Container uses simple spacing to keep focus on the input/visibility control.',
          ]}
        />
      </div>
    </div>
  );
}

