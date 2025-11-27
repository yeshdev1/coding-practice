import React from 'react';
import { useState } from 'react';

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
  // TODO: Implement state here

  return (
    <div>
      <h2>Counter with History</h2>
      <p className="instructions">
        Implement a counter that tracks its history.
      </p>
      
      {/* TODO: Add your UI here */}
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        <CounterWithHistoryImplementation />
      </div>
    </div>
  );
}
