import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const ContextFormBuilder = () => {
  const initialCode = `
// Implement a form builder that uses Context to manage form state
// and supports adding/removing different field types dynamically.

export default function FormBuilder() {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Form Builder</h3>
      {/* Your implementation here */}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Context Form Builder</h2>
      <Requirements>
        <li>Create a FormContext to manage the state of the form schema.</li>
        <li>Allow users to add new fields (Text, Checkbox, Select) to the form.</li>
        <li>Render the form dynamically based on the schema in Context.</li>
        <li>Implement a "Preview" mode to see the working form.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default ContextFormBuilder;
