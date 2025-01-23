export function generateSudoku(): number[][] {
  // Initialize empty 9x9 grid
  const grid: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
  
  // Fill diagonal boxes first (these can be filled independently)
  fillDiagonalBoxes(grid);
  
  // Solve the rest of the puzzle
  solveSudoku(grid);
  
  // Remove numbers to create puzzle
  return removeNumbers(grid);
}

function fillDiagonalBoxes(grid: number[][]) {
  for (let box = 0; box < 9; box += 3) {
    fillBox(grid, box, box);
  }
}

function fillBox(grid: number[][], row: number, col: number) {
  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let index = 0;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid[row + i][col + j] = numbers[index++];
    }
  }
}

function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function solveSudoku(grid: number[][]): boolean {
  let row = 0;
  let col = 0;
  let isEmpty = false;
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        row = i;
        col = j;
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) break;
  }
  
  if (!isEmpty) return true;
  
  for (let num = 1; num <= 9; num++) {
    if (isValidMove(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveSudoku(grid)) return true;
      grid[row][col] = 0;
    }
  }
  
  return false;
}

function removeNumbers(grid: number[][]): number[][] {
  const puzzle = grid.map(row => [...row]);
  const cellsToRemove = 40; // Adjust difficulty here
  
  let count = 0;
  while (count < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      count++;
    }
  }
  
  return puzzle;
}

export function isValidMove(grid: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }
  
  // Check 3x3 box
  const startRow = row - row % 3;
  const startCol = col - col % 3;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }
  
  return true;
}
