import {
  SYMBOLS,
  GRID_ROWS,
  GRID_COLS,
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

  return multiplierKeys[0]; // fallback to 2x
};

export const generateGrid = () => {
  const newGrid = [];
  for (let i = 0; i < GRID_ROWS; i++) {
    const row = [];
    for (let j = 0; j < GRID_COLS; j++) {
      // Check if this cell should be a multiplier
      if (Math.random() < MULTIPLIER_SPAWN_CHANCE) {
        row.push(getRandomMultiplier());
      } else {
        row.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      }
    }
    newGrid.push(row);
  }
  return newGrid;
};
