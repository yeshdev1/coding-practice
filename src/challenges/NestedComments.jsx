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

import React, { useState } from 'react';
import { fetchComments, postReply } from '../api/mockApi';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const Comment = ({ comment, addReply }) => {
    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReply = () => {
        if (replyText.trim()) {
            addReply(comment.id, replyText);
            setReplyText('');
            setShowReply(false);
        }
    }

    return (
        <div style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', paddingLeft: '10px', marginBottom: '10px' }}>
            <p>{comment.text}</p>
            <button onClick={() => setShowReply(!showReply)} style={{ fontSize: '0.8rem' }}>Reply</button>
            {showReply && (
                <div style={{ marginTop: '5px' }}>
                    <input value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Reply..." />
                    <button onClick={handleReply}>Post</button>
                </div>
            )}
            {comment.children.map(child => <Comment key={child.id} comment={child} addReply={addReply} />)}
        </div>
    )
}

const NestedCommentsImplementation = () => {
  const [comments, setComments] = useState([
    { id: 1, text: "First!", children: [] },
    { id: 2, text: "Second", children: [{ id: 3, text: "Reply", children: [] }] }
  ]);

  const addReply = (parentId, text) => {
      const newReply = { id: Date.now(), text, children: [] };
      
      const addRecursive = (list) => {
          return list.map(item => {
              if (item.id === parentId) {
                  return { ...item, children: [...item.children, newReply] };
              }
              return { ...item, children: addRecursive(item.children) };
          });
      };

      setComments(addRecursive(comments));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Comments</h3>
      {comments.map(c => <Comment key={c.id} comment={c} addReply={addReply} />)}
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Recursive data structures and optimistic UI updates.
        <pre>{`
[ Comment 1 ]
    |
    +-- [ Reply 1.1 ]
    |       |
    |       +-- [ Reply 1.1.1 ]
    |
[ Comment 2 ]
    |
    (Reply Clicked) -> [ Input Form ]
                            |
                            v
                   (Optimistic Update: Show immediately)
                            |
                   (API Call: POST /reply)
        `}</pre>
      </p>
      <Requirements>
            <li>Display a list of comments.</li>
            <li>Allow replying to any comment (creating nested threads).</li>
            <li>Support infinite depth of nesting.</li>
            <li>Optimistic updates (UI updates before API confirmation).</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={NestedCommentsImplementation} />
      </div>
    </div>
  );
}
