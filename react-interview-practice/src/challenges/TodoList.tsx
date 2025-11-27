import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

/**
 * Challenge: Todo List
 * Difficulty: Easy
 * 
 * Requirements:
 * 1. Add items to a list.
 * 2. Mark items as complete (toggle).
 * 3. Delete items.
 * 4. Filter by All/Active/Completed (optional but recommended).
 */

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoListImplementation = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState<string>('');

  const toggleTodo = ({
    id
  }: {
    id: number;
  }) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  const deleteTodo = ({
    id
  }: {
    id: number;
  }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input type='checkbox' checked={todo.completed} onChange={() => toggleTodo({ id: todo.id })} />
            {todo.text}
            <button onClick={() => deleteTodo({ id: todo.id })}>Delete</button>
          </li>
        ))}
      </ul>
      <input type='text' placeholder='Add a todo' value={content} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setTodos([...todos, { id: Date.now(), text: content, completed: false }]);
          setContent('');
        }
      }} 
      onChange={(e) => setContent((e.target as HTMLInputElement).value)}/>
    </div>
  )
}  

export default function TodoList() {
  const initialCode = `
export default function TodoApp() {
  const [todos, setTodos] = React.useState([]);
  const [text, setText] = React.useState('');

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setText('');
  };

  const toggle = (id) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            onClick={() => toggle(todo.id)}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Todo List</h2>
      <Requirements>
            <li>Add items to a list.</li>
            <li>Mark items as complete (toggle).</li>
            <li>Delete items.</li>
            <li>Filter by All/Active/Completed (optional but recommended).</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>

      <h3>Reference Implementation (Static)</h3>
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        <TodoListImplementation />
      </div>
    </div>
  );
}

