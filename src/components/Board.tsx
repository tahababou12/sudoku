import { useState } from 'react';
import Cell from './Cell';
import { generateSudoku, isValidMove, solveSudoku } from '../utils/sudoku';

export default function Board() {
  const [board, setBoard] = useState(generateSudoku());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [initialBoard] = useState([...board.map(row => [...row])]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [solution] = useState(() => {
    const solvedBoard = board.map(row => [...row]);
    solveSudoku(solvedBoard);
    return solvedBoard;
  });

  const handleCellClick = (row: number, col: number) => {
    setSelected([row, col]);
  };

  const handleNumberInput = (number: number) => {
    if (!selected || isRevealed) return;
    const [row, col] = selected;
    
    if (initialBoard[row][col] !== 0) return;
    
    if (isValidMove(board, row, col, number)) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = number;
      setBoard(newBoard);
    }
  };

  const toggleRevealAnswer = () => {
    if (isRevealed) {
      setBoard([...board.map(row => [...row])]);
    }
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-9 gap-0.5 bg-gray-300 p-0.5 rounded-lg shadow-lg">
        {(isRevealed ? solution : board).map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              value={cell}
              isInitial={initialBoard[i][j] !== 0}
              isSelected={selected?.[0] === i && selected?.[1] === j}
              onClick={() => handleCellClick(i, j)}
            />
          ))
        )}
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className="w-12 h-12 bg-white rounded-lg shadow hover:bg-blue-50 
                     font-semibold text-lg transition-colors"
            disabled={isRevealed}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        onClick={toggleRevealAnswer}
        className={`px-4 py-2 ${
          isRevealed ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
        } text-white rounded-lg transition-colors font-medium`}
      >
        {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
      </button>
    </div>
  );
}
