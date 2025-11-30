import React, { useId } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const FormField = ({ label, description }) => {
    const id = useId();
    return (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={id} style={{ display: 'block', fontWeight: 'bold' }}>{label}</label>
            <input id={id} type="text" aria-describedby={`${id}-desc`} style={{ margin: '5px 0' }} />
            <p id={`${id}-desc`} style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>{description}</p>
        </div>
    )
}

const UseIdFormImplementation = () => {
  return (
    <div style={{ padding: '20px' }}>
      <FormField label="First Name" description="Enter your given name." />
      <FormField label="Last Name" description="Enter your family name." />
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Generating stable, unique IDs for accessibility (A11y).
        <pre>{`
[ Form Component ]
    |
    +-- useId() -> ":r1:"
    |
    +-- <label htmlFor=":r1:">
    |
    +-- <input id=":r1:" aria-describedby=":r1:-desc">
    |
    +-- <p id=":r1:-desc">
        `}</pre>
      </p>
      <Requirements>
        <li>Create a reusable FormField component (Label + Input + Description).</li>
        <li>Use \`useId\` to generate unique IDs for linking \`htmlFor\`, \`id\`, and \`aria-describedby\`.</li>
        <li>Render multiple instances of this component to prove IDs are unique and stable.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={UseIdFormImplementation} />
      </div>
    </div>
  );
};

export default UseIdForm;
