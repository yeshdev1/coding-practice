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

import Requirements from '../components/Requirements';

export default function StarRating() {
  return (
    <div>
      <h2>Star Rating</h2>
      <Requirements>
            <li>Render 5 stars (or N stars via props).</li>
            <li>Hover over a star highlights it and previous ones.</li>
            <li>Clicking a star sets the rating.</li>
            <li>Support for "read-only" mode.</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

