import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const CharacterCounterImplementation = () => {
  const [text, setText] = useState('');
  const limit = 100;

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={limit}
        placeholder="Type something..."
        style={{ width: '100%', height: '100px', padding: '8px' }}
      />
      <p style={{ color: text.length >= limit ? 'red' : 'inherit' }}>
        {text.length} / {limit} characters
      </p>
    </div>
  );
};

export default function CharacterCounter() {
  const initialCode = `
import React, { useState } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState('');
  const limit = 100;

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={limit}
        placeholder="Type something..."
        style={{ width: '100%', height: '100px', padding: '8px' }}
      />
      <p style={{ color: text.length >= limit ? 'red' : 'inherit' }}>
        {text.length} / {limit} characters
      </p>
    </div>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>Character Counter</h2>
      <p>
        <strong>Scenario:</strong> An input area that tracks the number of characters typed, with a strict limit.
      </p>
      <Requirements>
        <li>Display a textarea for input.</li>
        <li>Show the current character count vs. the limit (e.g., "50 / 100").</li>
        <li>Prevent typing beyond the limit (100 chars).</li>
        <li>Ideally change color when approaching or at the limit (optional).</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={CharacterCounterImplementation} />
      </div>
    </div>
  );
}

