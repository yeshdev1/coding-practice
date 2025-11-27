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

export default function NestedComments() {
  // Use fetchComments() and postReply(parentId, text) here
  
  return (
    <div>
      <h2>Nested Comments System</h2>
      <p>Build a Reddit-style comment thread with infinite nesting and replies.</p>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

