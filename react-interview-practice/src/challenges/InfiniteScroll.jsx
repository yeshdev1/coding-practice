/**
 * Challenge: Infinite Scroll
 * Difficulty: Medium
 * 
 * Requirements:
 * 1. Render a list of items.
 * 2. When the user scrolls to the bottom, fetch and append more items.
 * 3. Use IntersectionObserver for best performance.
 */

import { fetchInfiniteItems } from '../api/mockApi';
import Requirements from '../components/Requirements';

export default function InfiniteScroll() {
  // Use fetchInfiniteItems(page, limit) here
  
  return (
    <div>
      <h2>Infinite Scroll</h2>
      <Requirements>
            <li>Render a list of items.</li>
            <li>When the user scrolls to the bottom, fetch and append more items.</li>
            <li>Use IntersectionObserver for best performance.</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

