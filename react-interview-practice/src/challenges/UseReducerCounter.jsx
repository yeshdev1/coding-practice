import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

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
      <Requirements>
        <li>Implement state with count, step, min, and max values.</li>
        <li>Use `useReducer` to handle all state updates.</li>
        <li>Implement actions: increment, decrement, setStep, reset.</li>
        <li>Prevent count from exceeding min/max bounds logic in the reducer.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default UseReducerCounter;
