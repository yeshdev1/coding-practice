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

export default function InfiniteScroll() {
  // Use fetchInfiniteItems(page, limit) here
  
  return (
    <div>
      <h2>Infinite Scroll</h2>
      <p>Load more content automatically as the user scrolls to the bottom.</p>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

