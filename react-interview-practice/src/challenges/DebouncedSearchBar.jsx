import Requirements from '../components/Requirements';

/**
 * Challenge: Debounced Search Bar
 * Difficulty: Medium
 * 
 * Requirements:
 * 1. Input field for search query.
 * 2. Fetch results from a mock API (or real one) as user types.
 * 3. DEBOUNCE the API call (only call after user stops typing for 500ms).
 * 4. Display results.
 */


export default function DebouncedSearchBar() {
  // Use searchItems(query) here
  
  return (
    <div>
      <h2>Debounced Search Bar</h2>
      <Requirements>
            <li>Input field for search query.</li>
            <li>Fetch results from a mock API (or real one) as user types.</li>
            <li>DEBOUNCE the API call (only call after user stops typing for 500ms).</li>
            <li>Display results.</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

