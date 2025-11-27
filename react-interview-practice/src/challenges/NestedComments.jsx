/**
 * Challenge: Nested Comments System
 * Difficulty: Hard
 * 
 * Requirements:
 * 1. Display a list of comments.
 * 2. Allow replying to any comment (creating nested threads).
 * 3. Support infinite depth of nesting.
 * 4. Optimistic updates (UI updates before API confirmation).
 */

import { fetchComments, postReply } from '../api/mockApi';
import Requirements from '../components/Requirements';

export default function NestedComments() {
  // Use fetchComments() and postReply(parentId, text) here
  
  return (
    <div>
      <h2>Nested Comments System</h2>
      <Requirements>
            <li>Display a list of comments.</li>
            <li>Allow replying to any comment (creating nested threads).</li>
            <li>Support infinite depth of nesting.</li>
            <li>Optimistic updates (UI updates before API confirmation).</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

