import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const TicTacToe = () => {
  const initialCode = `
export default function TicTacToe() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  // Implement winner calculation and click handling

  return (
    <div style={{ padding: '20px' }}>
      <h3>Next Player: {xIsNext ? 'X' : 'O'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '5px' }}>
        {board.map((cell, i) => (
          <button key={i} style={{ height: '50px' }}>{cell}</button>
        ))}
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <Requirements>
        <li>Render a 3x3 grid.</li>
        <li>Alternating turns between 'X' and 'O'.</li>
        <li>Detect a winner (3 in a row/column/diagonal) and stop the game.</li>
        <li>Detect a draw.</li>
        <li>Display game history (allow jumping back to previous moves).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default TicTacToe;
