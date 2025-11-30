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

import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const DragAndDropBoardImplementation = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: "todo" },
    { id: 2, title: "Task 2", status: "doing" },
    { id: 3, title: "Task 3", status: "done" }
  ]);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const onDrop = (e, status) => {
    const id = e.dataTransfer.getData("id");
    setTasks(tasks.map(t => t.id == id ? { ...t, status } : t));
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {['todo', 'doing', 'done'].map(status => (
        <div 
          key={status}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, status)}
          style={{ width: '150px', minHeight: '200px', border: '1px solid #ccc', padding: '10px' }}
        >
          <h4>{status.toUpperCase()}</h4>
          {tasks.filter(t => t.status === status).map(t => (
            <div 
              key={t.id} 
              draggable 
              onDragStart={(e) => onDragStart(e, t.id)}
              style={{ padding: '10px', background: '#444', marginBottom: '5px', cursor: 'grab' }}
            >
              {t.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DragAndDropBoard() {
  const initialCode = `
export default function KanbanBoard() {
  const [tasks, setTasks] = React.useState([
    { id: 1, title: "Task 1", status: "todo" },
    { id: 2, title: "Task 2", status: "doing" },
    { id: 3, title: "Task 3", status: "done" }
  ]);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const onDrop = (e, status) => {
    const id = e.dataTransfer.getData("id");
    setTasks(tasks.map(t => t.id == id ? { ...t, status } : t));
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {['todo', 'doing', 'done'].map(status => (
        <div 
          key={status}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, status)}
          style={{ width: '150px', minHeight: '200px', border: '1px solid #ccc', padding: '10px' }}
        >
          <h4>{status.toUpperCase()}</h4>
          {tasks.filter(t => t.status === status).map(t => (
            <div 
              key={t.id} 
              draggable 
              onDragStart={(e) => onDragStart(e, t.id)}
              style={{ padding: '10px', background: '#444', marginBottom: '5px', cursor: 'grab' }}
            >
              {t.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Drag and Drop Board</h2>
      <p>
        <strong>Scenario:</strong> Implementing a Kanban board with drag-and-drop.
        <pre>{`
[ Todo ]       [ Doing ]      [ Done ]
   |              |              |
[ Task A ] --(Drag)--> [ Task A ]
   |
(onDragStart)     (onDrop) -> Update State: Status='doing'
        `}</pre>
      </p>
      <Requirements>
            <li>Multiple columns (like Trello: Todo, In Progress, Done).</li>
            <li>Drag items between columns.</li>
            <li>Reorder items within a column.</li>
            <li>Use HTML5 Drag & Drop API or mouse events.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={DragAndDropBoardImplementation} />
      </div>
    </div>
  );
}
