import React from 'react';
import { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';
/**
 * Challenge: Counter with History
 * 
 * Rules:
 * 1. Increment button increases count by 1.
 * 2. Decrement button decreases count by 1.
 * 3. Reset button sets count to 0.
 * 4. Maintain a history of changes (e.g., "Incremented to 1", "Decremented to 0").
 */

const CounterWithHistoryImplementation = () => {
    const [count, setCount] = useState<number>(0);
    const [history, setHistory] = useState<string[]>([]);

    const changeCount = ({
      direction
    }:{
      direction: 'Increment' | 'Decrement' | 'Reset';
    }) => {
      if (direction === 'Reset') {
        setCount(0);
        setHistory([...history, 'Reset to 0']);
        return;
      }
      setCount(count + (direction === 'Increment' ? 1 : -1));
      setHistory([
        ...history,
        `${direction} to ${count + (direction === 'Increment' ? 1 : -1)}`
      ])
    }
    
    return (
      <div>
        <p>Count: {count}</p>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button onClick={() => changeCount({ direction: 'Increment' })}>Increment</button>
        <button onClick={() => changeCount({ direction: 'Decrement' })}>Decrement</button>
        <button onClick={() => changeCount({ direction: 'Reset' })}>Reset</button>
      </div>
    )
}

export default function CounterWithHistory() {
  const initialCode = `
export default function Counter() {
  const [count, setCount] = React.useState(0);
  const [history, setHistory] = React.useState([]);

  const increment = () => {
    setCount(c => c + 1);
    setHistory(h => [...h, 'Incremented to ' + (count + 1)]);
  };

  const decrement = () => {
    setCount(c => c - 1);
    setHistory(h => [...h, 'Decremented to ' + (count - 1)]);
  };

  const reset = () => {
    setCount(0);
    setHistory(h => [...h, 'Reset to 0']);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={increment} style={{ marginRight: '8px' }}>Increment</button>
        <button onClick={decrement} style={{ marginRight: '8px' }}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div style={{ textAlign: 'left', background: '#333', padding: '10px', borderRadius: '4px' }}>
        <h4>History:</h4>
        <ul>
          {history.map((entry, i) => <li key={i}>{entry}</li>)}
        </ul>
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Counter with History</h2>
      <p>
        <strong>Scenario:</strong> A basic counter that maintains an audit trail of all actions.
        <pre>{`
      [Counter: 5]
         /   |   \\
    (+)   (-)   (Reset)
     |     |       |
     v     v       v
[History Log: "Inc to 1", "Inc to 2", "Dec to 1"...]
        `}</pre>
      </p>
      <Requirements>
          <li>Increment button increases count by 1.</li>
          <li>Decrement button decreases count by 1.</li>
          <li>Reset button sets count to 0.</li>
          <li>Maintain a history of changes (e.g., "Incremented to 1", "Decremented to 0").</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} scope={{ CounterWithHistoryImplementation }} solutionComponent={CounterWithHistoryImplementation} />
      </div>
    </div>
  );
}
