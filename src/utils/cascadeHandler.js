import { SYMBOLS, GRID_ROWS } from "../constants/gameConstants";

export const removeClusterAndDrop = (grid, clusters) => {
  const newGrid = grid.map((row) => [...row]);
  const falling = new Map();

  clusters.forEach((cluster) => {
    cluster.cells.forEach(([row, col]) => {
      newGrid[row][col] = null;
    });
  });

  for (let col = 0; col < grid[0].length; col++) {
    const column = [];
    const oldPositions = [];

    for (let row = GRID_ROWS - 1; row >= 0; row--) {
      if (newGrid[row][col] !== null) {
        column.push(newGrid[row][col]);
        oldPositions.push(row);
      }
    }

    const emptyCount = GRID_ROWS - column.length;
    const newSymbols = [];
    for (let i = 0; i < emptyCount; i++) {
      newSymbols.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }

    const allSymbols = [...newSymbols, ...column];

    for (let row = 0; row < GRID_ROWS; row++) {
      newGrid[row][col] = allSymbols[row];

      let dropDistance = 0;
      if (row < emptyCount) {
        dropDistance = -(emptyCount - row);
      } else {
        const oldIndex = row - emptyCount;
        if (oldIndex < oldPositions.length) {
          dropDistance = oldPositions[oldIndex] - row;
        }
      }

      if (dropDistance !== 0) {
        falling.set(`${row},${col}`, dropDistance);
      }
    }
  }

  return { newGrid, falling };
};
