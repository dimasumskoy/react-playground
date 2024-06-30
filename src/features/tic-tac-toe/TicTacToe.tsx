import "./styles.scss";
import { useState, useEffect } from "react";

type Cell = string | undefined;
type Row = Cell[];
type Board = Row[];
type Coordinates = Array<[number, number]>;
type GameState = {
  isFinished: boolean;
  winner: Cell | null;
  coords: Coordinates;
  direction: string;
};
type WinnerState = {
  win: boolean;
  coords: Coordinates;
  direction: string;
};

const buildBoard = (size: number) => {
  const board = [];
  for (let i = 0; i < size; i++) {
    const row = [...Array(size)];
    board[i] = row;
  }
  return board;
};

const winHorizontally = (board: Board): WinnerState => {
  let win = false;
  const coords: Coordinates = [];

  for (let i = 0; i < board.length; i++) {
    const row = new Set(board[i]);
    if (row.size === 1 && !row.has(undefined)) {
      board[i].forEach((cell, index) => coords.push([i, index]));
      win = true;
    }
  }

  return {
    win,
    coords,
    direction: "horizontal",
  };
};

const winVertically = (board: Board): WinnerState => {
  const newBoard = [];
  let column = 0;

  while (column < board.length) {
    const newRow = [];
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      newRow.push(row[column]);
    }
    newBoard.push(newRow);
    column++;
  }

  const result = winHorizontally(newBoard);
  return { ...result, direction: "vertical" };
};

const winDiagonally = (board: Board): WinnerState => {
  const newBoard: Board = [[], []];
  let start = 0;
  let end = board.length - 1;

  while (start < board.length) {
    newBoard[0].push(board[start][start]);
    newBoard[1].push(board[start][end]);
    start++;
    end--;
  }

  const lr = new Set(newBoard[0]);
  const rl = new Set(newBoard[1]);
  let diagonalDirection = "";
  let win = true;

  if (lr.size === 1 && !lr.has(undefined)) {
    diagonalDirection = "lr";
  } else if (rl.size === 1 && !rl.has(undefined)) {
    diagonalDirection = "rl";
  } else {
    win = false;
  }

  const result = { win, coords: [] };
  return { ...result, direction: `diagonal-${diagonalDirection}` };
};

const isGameFinished = (board: Board): WinnerState => {
  const horizontalWin = winHorizontally(board);
  if (horizontalWin.win) {
    console.log(horizontalWin)
    return horizontalWin;
  }
  const verticalWin = winVertically(board);
  if (verticalWin.win) {
    return verticalWin;
  }
  const diagonalWin = winDiagonally(board);
  if (diagonalWin.win) {
    return diagonalWin;
  }

  return {
    win: false,
    coords: [],
    direction: "",
  };
};

const getWinnerCoords = (board: Board, currentUser: Cell): Coordinates => {
  const coords: Coordinates = [];
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    row.forEach(
      (cell, index) => cell === currentUser && coords.push([i, index])
    );
  }
  return coords;
};

const initialGameState: GameState = {
  isFinished: false,
  winner: null,
  coords: [],
  direction: ""
};

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(buildBoard(3));
  const [currentUser, setCurrentUser] = useState<Cell>("O");
  const [gameStatus, setGameStatus] = useState<GameState>(initialGameState);

  const restart = () => {
    setBoard(buildBoard(3));
    setGameStatus(initialGameState);
  };

  const handleCellClick = (ri: number, ci: number) => {
    setBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      newBoard[ri][ci] = currentUser;

      return newBoard;
    });
  };

  useEffect(() => {
    const isFinished: WinnerState = isGameFinished(board);
    if (isFinished.win) {
      // const winnerCoords = getWinnerCoords(board, currentUser);
      setGameStatus({
        isFinished: true,
        winner: currentUser,
        coords: isFinished.coords,
        direction: isFinished.direction
      });
    }
  }, [board]);

  useEffect(() => {
    if (!gameStatus.isFinished) {
      setCurrentUser((prev) => (prev === "X" ? "O" : "X"));
    }
  }, [board, gameStatus.isFinished]);

  const isWinnerCell = (ri: number, ci: number) => {
    return gameStatus.isFinished && board[ri][ci] === gameStatus.winner;
  };

  return (
    <>
      <div className="board">
        {board.map((row, ri) => {
          return (
            <div className="row" key={ri}>
              {row.map((cell, ci) => {
                const isWinner = isWinnerCell(ri, ci) || "";
                return (
                  <div
                    className={`cell ${isWinner && "winner" + " " + gameStatus.direction}`}
                    key={`${ri}-${ci}`}
                    onClick={() => handleCellClick(ri, ci)}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {gameStatus.isFinished && (
        <div>
          <p>Winner is: {gameStatus.winner}</p>
          <button onClick={() => restart()}>Restart</button>
        </div>
      )}
    </>
  );
};

export default TicTacToe;
