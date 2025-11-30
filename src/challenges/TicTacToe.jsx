import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const TicTacToeImplementation = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
      if (board[i] || winner) return;
      const newBoard = [...board];
      newBoard[i] = xIsNext ? 'X' : 'O';
      setBoard(newBoard);
      setXIsNext(!xIsNext);
      checkWinner(newBoard);
  };

  const checkWinner = (squares) => {
      const lines = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              setWinner(squares[a]);
              return;
          }
      }
      if (!squares.includes(null)) {
          setWinner('Draw');
      }
  };

  const reset = () => {
      setBoard(Array(9).fill(null));
      setXIsNext(true);
      setWinner(null);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>{winner ? (winner === 'Draw' ? 'Draw!' : `Winner: ${winner}`) : `Next Player: ${xIsNext ? 'X' : 'O'}`}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '5px', marginBottom: '10px' }}>
        {board.map((cell, i) => (
          <button key={i} style={{ height: '50px', fontSize: '1.5rem' }} onClick={() => handleClick(i)}>{cell}</button>
        ))}
      </div>
      <button onClick={reset}>Reset Game</button>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Classic game logic and state management.
        <pre>{`
[ X ] [ O ] [ X ]
[ O ] [ X ] [   ]
[   ] [   ] [ X ] <-- Winner!

Check lines after every move:
- Row 1, 2, 3
- Col 1, 2, 3
- Diag 1, 2
        `}</pre>
      </p>
      <Requirements>
        <li>Render a 3x3 grid.</li>
        <li>Alternating turns between 'X' and 'O'.</li>
        <li>Detect a winner (3 in a row/column/diagonal) and stop the game.</li>
        <li>Detect a draw.</li>
        <li>Display game history (allow jumping back to previous moves).</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={TicTacToeImplementation} />
      </div>
    </div>
  );
};

export default TicTacToe;
