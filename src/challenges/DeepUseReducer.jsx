import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const DeepUseReducer = () => {
  const initialCode = `
const initialState = {
  step: 1,
  formData: { name: '', email: '' },
  status: 'idle' // idle, submitting, success, error
};

function formReducer(state, action) {
  // Implement complex state logic
  return state;
}

export default function WizardForm() {
  const [state, dispatch] = React.useReducer(formReducer, initialState);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Step: {state.step}</h3>
      {/* Implement form steps */}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Full State Machine with useReducer</h2>
      <Requirements>
        <li>Build a multi-step form wizard (Step 1 -> Step 2 -> Submit).</li>
        <li>Use `useReducer` to manage the entire flow as a Finite State Machine.</li>
        <li>Handle transitions: `NEXT_STEP`, `PREV_STEP`, `UPDATE_FIELD`, `SUBMIT`, `SUCCESS`, `ERROR`.</li>
        <li>Implement "Undo" functionality by storing past states in the reducer (Time Travel).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default DeepUseReducer;
