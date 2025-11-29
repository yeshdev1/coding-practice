import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const UseIdForm = () => {
  const initialCode = `
export default function AccessibleForm() {
  // Use useId here for unique IDs
  
  return (
    <div style={{ padding: '20px' }}>
      <div>
        <label>First Name:</label>
        <input type="text" aria-describedby="desc1" />
        <p id="desc1">Enter your first name</p>
      </div>
      {/* Replicate this field and see ID conflicts without useId */}
    </div>
  );
}
`;

  return (
    <div>
      <h2>useId Accessible Form</h2>
      <Requirements>
        <li>Create a reusable FormField component (Label + Input + Description).</li>
        <li>Use `useId` to generate unique IDs for linking `htmlFor`, `id`, and `aria-describedby`.</li>
        <li>Render multiple instances of this component to prove IDs are unique and stable.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default UseIdForm;
