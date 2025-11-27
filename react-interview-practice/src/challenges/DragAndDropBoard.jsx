/**
 * Challenge: Drag and Drop Board
 * Difficulty: Hard
 * 
 * Requirements:
 * 1. Multiple columns (like Trello: Todo, In Progress, Done).
 * 2. Drag items between columns.
 * 3. Reorder items within a column.
 * 4. Use HTML5 Drag & Drop API or mouse events.
 */

import Requirements from '../components/Requirements';

export default function DragAndDropBoard() {
  return (
    <div>
      <h2>Drag and Drop Board</h2>
      <Requirements>
            <li>Multiple columns (like Trello: Todo, In Progress, Done).</li>
            <li>Drag items between columns.</li>
            <li>Reorder items within a column.</li>
            <li>Use HTML5 Drag & Drop API or mouse events.</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

