/**
 * Challenge: API Data Fetcher
 * Difficulty: Easy
 * 
 * Requirements:
 * 1. Fetch data from a public API (e.g., https://jsonplaceholder.typicode.com/posts).
 * 2. Display the data in a list.
 * 3. Handle loading state.
 * 4. Handle error state.
 */

import { fetchPosts } from '../api/mockApi';

export default function ApiDataFetcher() {
  // Use fetchPosts() here
  
  return (
    <div>
      <h2>API Data Fetcher</h2>
      <p>Fetch and display data from an API with loading and error states.</p>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

