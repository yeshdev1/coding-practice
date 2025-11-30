import React, { useReducer } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const initialState = { count: 0, step: 1, min: 0, max: 10 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: Math.min(state.count + state.step, state.max) };
    case 'decrement':
      return { ...state, count: Math.max(state.count - state.step, state.min) };
    case 'setStep':
        return { ...state, step: action.payload };
    case 'reset':
        return initialState;
    default:
      throw new Error();
  }
}

const UseReducerCounterImplementation = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div style={{ padding: '20px' }}>
            <h3>Count: {state.count}</h3>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            <div>
                <label>Step: </label>
                <input type="number" value={state.step} onChange={(e) => dispatch({ type: 'setStep', payload: Number(e.target.value) })} />
            </div>
        </div>
    )
}

const UseReducerCounter = () => {
  const initialCode = `
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    // Add other cases
    default: throw new Error();
  }
}

export default function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Count: {state.count}</h3>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}
`;

  return (
    <div>
      <h2>useReducer Complex Counter</h2>
      <p>
        <strong>Scenario:</strong> Centralized state logic for complex components.
        <pre>{`
UI Event: [Click "+"]
     |
     v
Dispatch({ type: 'increment' })
     |
     v
[ Reducer Function ]
(Current State, Action) => New State
     |
     v
Update UI: Count + 1
        `}</pre>
      </p>
      <Requirements>
        <li>Implement state with count, step, min, and max values.</li>
        <li>Use \`useReducer\` to handle all state updates.</li>
        <li>Implement actions: increment, decrement, setStep, reset.</li>
        <li>Prevent count from exceeding min/max bounds logic in the reducer.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={UseReducerCounterImplementation} />
      </div>
    </div>
  );
};

export default UseReducerCounter;
