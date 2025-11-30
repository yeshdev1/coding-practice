import React, { useReducer, useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const initialFormState = {
  step: 1,
  formData: { name: '', email: '' },
  status: 'idle', // idle, submitting, success, error
  history: []
};

function formReducer(state, action) {
  const { history, ...currentState } = state;
  
  const newState = (() => {
      switch (action.type) {
        case 'NEXT_STEP':
          return { ...currentState, step: state.step + 1 };
        case 'PREV_STEP':
          return { ...currentState, step: Math.max(1, state.step - 1) };
        case 'UPDATE_FIELD':
          return { ...currentState, formData: { ...state.formData, [action.field]: action.value } };
        case 'SUBMIT':
          return { ...currentState, status: 'submitting' };
        case 'SUCCESS':
          return { ...currentState, status: 'success' };
        case 'ERROR':
          return { ...currentState, status: 'error' };
        case 'UNDO':
            if (state.history.length === 0) return state;
            const previous = state.history[state.history.length - 1];
            return { ...previous, history: state.history.slice(0, -1) };
        default:
          return state;
      }
  })();

  if (action.type === 'UNDO') return newState;

  // Only push to history on significant changes, or all changes? Let's do all for simplicity
  // But wait, we need to prevent history loops.
  return { ...newState, history: [...state.history, { ...currentState, history: [] }] };
}

const DeepUseReducerImplementation = () => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleSubmit = () => {
      dispatch({ type: 'SUBMIT' });
      setTimeout(() => {
          if (state.formData.email.includes('@')) {
              dispatch({ type: 'SUCCESS' });
          } else {
              dispatch({ type: 'ERROR' });
          }
      }, 1000);
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
          <button onClick={() => dispatch({ type: 'UNDO' })} disabled={state.history.length === 0}>Undo</button>
      </div>
      <h3>Step: {state.step}</h3>
      {state.step === 1 && (
          <div>
              <label>Name: </label>
              <input 
                value={state.formData.name} 
                onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })} 
              />
              <button onClick={() => dispatch({ type: 'NEXT_STEP' })}>Next</button>
          </div>
      )}
      {state.step === 2 && (
          <div>
              <label>Email: </label>
              <input 
                value={state.formData.email} 
                onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })} 
              />
              <button onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>
              <button onClick={handleSubmit}>Submit</button>
          </div>
      )}
      {state.status === 'submitting' && <p>Submitting...</p>}
      {state.status === 'success' && <p style={{ color: 'green' }}>Success!</p>}
      {state.status === 'error' && <p style={{ color: 'red' }}>Error: Invalid Email</p>}
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Managing a complex multi-step wizard with strict transitions.
        <pre>{`
(Start) -> [ Step 1: Info ] --(Next)--> [ Step 2: Confirm ] --(Submit)--> [ Submitting ]
               ^                                 |                             |
               |                                 |                             v
            (Prev) <-----------------------------+                       (Success/Error)
        `}</pre>
      </p>
      <Requirements>
        <li>Build a multi-step form wizard (Step 1 -&gt; Step 2 -&gt; Submit).</li>
        <li>Use \`useReducer\` to manage the entire flow as a Finite State Machine.</li>
        <li>Handle transitions: \`NEXT_STEP\`, \`PREV_STEP\`, \`UPDATE_FIELD\`, \`SUBMIT\`, \`SUCCESS\`, \`ERROR\`.</li>
        <li>Implement "Undo" functionality by storing past states in the reducer (Time Travel).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={DeepUseReducerImplementation} />
      </div>
    </div>
  );
};

export default DeepUseReducer;
