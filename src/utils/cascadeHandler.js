import {
  SYMBOLS,
  GRID_ROWS,
  MULTIPLIER_SYMBOLS,
  MULTIPLIER_WEIGHTS,
  MULTIPLIER_SPAWN_CHANCE,
} from "../constants/gameConstants";

// Weighted random selection for multipliers
const getRandomMultiplier = () => {
  const multiplierKeys = Object.keys(MULTIPLIER_SYMBOLS);
  const totalWeight = Object.values(MULTIPLIER_WEIGHTS).reduce(
    (sum, weight) => sum + weight,
    0
  );

  let random = Math.random() * totalWeight;

  for (const key of multiplierKeys) {
    random -= MULTIPLIER_WEIGHTS[key];
    if (random <= 0) {
      return key;
    }
  }

  return multiplierKeys[0];
};

// Generate a random symbol (regular or multiplier)
const getRandomSymbol = () => {
  if (Math.random() < MULTIPLIER_SPAWN_CHANCE) {
    return getRandomMultiplier();
  }
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
};

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
      newSymbols.push(getRandomSymbol());
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
