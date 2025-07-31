import React, { useState, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Initialize board state: 9 cells, null means unmarked
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' or 'O' for player turns
  const [isXNext, setIsXNext] = useState(true);
  // "X", "O" or null for ongoing game
  const [winner, setWinner] = useState(null);
  // Boolean for draw
  const [isDraw, setIsDraw] = useState(false);

  // Accent and theme colors from project spec
  const COLORS = {
    accent: '#FFC107',
    primary: '#1976D2',
    secondary: '#2196F3',
    playerX: '#1976D2',
    playerO: '#2196F3',
  };

  // Compute winner or draw after every board change
  useEffect(() => {
    const winResult = calculateWinner(board);
    if (winResult) {
      setWinner(winResult);
      setIsDraw(false);
    } else if (board.every(Boolean)) {
      setIsDraw(true);
      setWinner(null);
    } else {
      setWinner(null);
      setIsDraw(false);
    }
  }, [board]);

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    // Don't allow moves if cell filled, game over or draw
    if (board[idx] || winner || isDraw) return;
    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  }

  // Helper to highlight winning cells (minimalistic approach)
  const winningLine = winner ? getWinnerLine(board) : [];

  // Helper render: cell
  const renderCell = idx => (
    <button
      key={idx}
      className={`ttt-cell${winningLine.includes(idx) ? ' highlight' : ''}`}
      onClick={() => handleCellClick(idx)}
      style={{
        color: board[idx] === 'X' ? COLORS.playerX : (board[idx] === 'O' ? COLORS.playerO : undefined),
        borderColor: COLORS.accent,
        background: 'var(--bg-primary)'
      }}
      aria-label={`Cell ${idx}`}
      disabled={board[idx] || winner || isDraw}
    >
      {board[idx]}
    </button>
  );

  // Header: showing turn, winner, or draw
  let status;
  if (winner) {
    status = (
      <span>
        <span style={{ color: winner === 'X' ? COLORS.playerX : COLORS.playerO, fontWeight: '700' }}>
          Player {winner}
        </span> wins!
      </span>
    );
  } else if (isDraw) {
    status = <span>It's a draw!</span>;
  } else {
    status = (
      <span>
        Next: <span style={{ color: isXNext ? COLORS.playerX : COLORS.playerO, fontWeight: '700' }}>
          Player {isXNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  return (
    <div className='ttt-root'>
      <main className='ttt-container'>
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className='ttt-status'>{status}</div>
        <div className='ttt-board'>
          {[0,1,2].map(row => (
            <div className='ttt-row' key={row}>
              {[0,1,2].map(col => renderCell(row*3+col))}
            </div>
          ))}
        </div>
        <button
          className='ttt-reset'
          onClick={restartGame}
          tabIndex={0}
          aria-label="Restart Game"
        >
          Restart Game
        </button>
      </main>
      <footer className="ttt-footer">
        <span className="ttt-footer-txt">
          Minimal Tic Tac Toe, React &middot; Players: <span style={{ color: COLORS.playerX }}>X</span> / <span style={{ color: COLORS.playerO }}>O</span>
        </span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Calculates the winner of the board. Returns "X", "O", or null.
 */
function calculateWinner(squares) {
  // Defines the winning positions (rows, columns, diagonals)
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
/**
 * Returns the line (array of indices) that is the winning line, or [] if none
 */
function getWinnerLine(squares) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return [];
}

export default App;
