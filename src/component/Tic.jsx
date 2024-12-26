import React, { useState } from "react";

const Tic = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXturn, setIsXturn] = useState(true);
  const [win, setWin] = useState(null);

  const renderSquare = (x) => {
    return (
      <button
        onClick={() => handleClick(x)}
        style={{
          margin: "5px",
          padding: "30px",
          backgroundColor: win ? "lightgray" : "white"
        }}
        disabled={win || board[x] !== null} 
      >
        {board[x]}
      </button>
    );
  };

  const handleClick = (idx) => {
    if (board[idx] !== null || win) {
      return; 
    }
    console.log("Click", idx);
    const newBoard = [...board];
    newBoard[idx] = isXturn ? "X" : "O";
    setBoard(newBoard);
    setIsXturn(!isXturn);

    const winUser = winner(newBoard);
    if (winUser) {
      setWin(newBoard[winUser[0]]);
    }
  };

  const winner = (newBoard) => {
    const possibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < possibilities.length; i++) {
      const [a, b, c] = possibilities[i];
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return possibilities[i];
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWin(null);
    setIsXturn(true); 
  };

  return (
    <>
      <div>
        <div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div>
        <button onClick={handleReset}>Restart</button>
      </div>
      <div>{win && <div>"{win}" jeet gya bhai</div>}</div>
    </>
  );
};

export default Tic;
