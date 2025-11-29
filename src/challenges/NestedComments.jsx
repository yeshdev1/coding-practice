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
import CodePlayground from '../components/CodePlayground';

export default function NestedComments() {
  const initialCode = `
export default function CommentSystem() {
  const [comments, setComments] = React.useState([
    { id: 1, text: "First!", children: [] },
    { id: 2, text: "Second", children: [{ id: 3, text: "Reply", children: [] }] }
  ]);

  const Comment = ({ comment }) => (
    <div style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', paddingLeft: '10px' }}>
      <p>{comment.text}</p>
      {comment.children.map(child => <Comment key={child.id} comment={child} />)}
    </div>
  );

  return (
    <div>
      {comments.map(c => <Comment key={c.id} comment={c} />)}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Nested Comments System</h2>
      <Requirements>
            <li>Display a list of comments.</li>
            <li>Allow replying to any comment (creating nested threads).</li>
            <li>Support infinite depth of nesting.</li>
            <li>Optimistic updates (UI updates before API confirmation).</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
}

