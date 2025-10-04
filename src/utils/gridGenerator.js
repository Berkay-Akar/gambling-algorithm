import { SYMBOLS, GRID_ROWS, GRID_COLS } from "../constants/gameConstants";

export const generateGrid = () => {
  const newGrid = [];
  for (let i = 0; i < GRID_ROWS; i++) {
    const row = [];
    for (let j = 0; j < GRID_COLS; j++) {
      row.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }
    newGrid.push(row);
  }
  return newGrid;
};
