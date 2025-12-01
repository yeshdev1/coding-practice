import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const LikeButtonImplementation = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(100);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };

  return (
    <button 
      onClick={handleLike}
      style={{
        background: 'transparent',
        border: `1px solid ${liked ? 'red' : '#ccc'}`,
        color: liked ? 'red' : '#ccc',
        padding: '5px 10px',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }}
    >
      <span>{liked ? '❤️' : '♡'}</span>
      <span>{count}</span>
    </button>
  );
};

export default function LikeButton() {
  const initialCode = `
import React, { useState } from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(100);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };

  return (
    <button 
      onClick={handleLike}
      style={{
        background: 'transparent',
        border: \`1px solid \${liked ? 'red' : '#ccc'}\`,
        color: liked ? 'red' : '#ccc',
        padding: '5px 10px',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }}
    >
      <span>{liked ? '❤️' : '♡'}</span>
      <span>{count}</span>
    </button>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>Like Button</h2>
      <p>
        <strong>Scenario:</strong> A social media style "Like" button that updates count and visual state.
      </p>
      <Requirements>
        <li>Initial count is 100.</li>
        <li>Clicking toggles "liked" state.</li>
        <li>If liking, increment count; if unliking, decrement count.</li>
        <li>Change icon (♡ to ❤️) and color (grey to red) when liked.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={LikeButtonImplementation} />
      </div>
    </div>
  );
}

