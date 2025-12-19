import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const TextMirrorImplementation = () => {
  const [text, setText] = useState('');

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
        style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
      />
      <div style={{ padding: '10px', background: '#333', borderRadius: '4px', minHeight: '40px' }}>
        <strong>Mirror:</strong> {text}
      </div>
      <div style={{ padding: '10px', marginTop: '5px', background: '#444', borderRadius: '4px', minHeight: '40px' }}>
        <strong>Reverse:</strong> {text.split('').reverse().join('')}
      </div>
    </div>
  );
};

export default function TextMirror({ showSolutionPanel = false }) {
  const initialCode = `
import React, { useState } from 'react';

export default function TextMirror() {
  const [text, setText] = useState('');

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
        style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
      />
      <div style={{ padding: '10px', background: '#333', borderRadius: '4px', minHeight: '40px' }}>
        <strong>Mirror:</strong> {text}
      </div>
      <div style={{ padding: '10px', marginTop: '5px', background: '#444', borderRadius: '4px', minHeight: '40px' }}>
        <strong>Reverse:</strong> {text.split('').reverse().join('')}
      </div>
    </div>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>Text Mirror</h2>
      <p>
        <strong>Scenario:</strong> Display user input in real-time in different formats.
      </p>
      <Requirements>
        <li>Input field captures user text.</li>
        <li>Display the exact text below the input.</li>
        <li>Also display the reversed version of the text.</li>
        <li>Updates should happen immediately as the user types.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground
          initialCode={initialCode}
          solutionComponent={TextMirrorImplementation}
          showSolutionPanel={showSolutionPanel}
          solutionCode={initialCode}
          solutionNotes={[
            'Single text state powers both the textarea and mirrored display for perfect sync.',
            'Textarea uses controlled value/onChange to prevent divergence between UI and state.',
            'Mirror box reuses the same content and styles to highlight immediate feedback.',
          ]}
         />
      </div>
    </div>
  );
}

