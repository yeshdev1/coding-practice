/**
 * Challenge: Star Rating Component
 * Difficulty: Medium
 * 
 * Requirements:
 * 1. Render 5 stars (or N stars via props).
 * 2. Hover over a star highlights it and previous ones.
 * 3. Clicking a star sets the rating.
 * 4. Support for "read-only" mode.
 */

import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const StarRatingImplementation = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div style={{ fontSize: '2rem', cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{ color: star <= (hover || rating) ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function StarRating() {
  const initialCode = `
export default function StarRating() {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);

  return (
    <div style={{ fontSize: '2rem', cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{ color: star <= (hover || rating) ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Star Rating</h2>
      <p>
        <strong>Scenario:</strong> Create an interactive rating component with hover effects.
        <pre>{`
[State] Rating: 3, Hover: 0

User Hovers Star 4:
[ ★ ★ ★ ★ ☆ ] (Hover State: 4 highlighted)
      ^
      |
(Mouse Enter) -> setHover(4)

User Clicks Star 4:
(Click) -> setRating(4)
        `}</pre>
      </p>
      <Requirements>
            <li>Render 5 stars (or N stars via props).</li>
            <li>Hover over a star highlights it and previous ones.</li>
            <li>Clicking a star sets the rating.</li>
            <li>Support for "read-only" mode.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={StarRatingImplementation} />
      </div>
    </div>
  );
}
