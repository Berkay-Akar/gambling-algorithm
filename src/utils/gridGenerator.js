import { SYMBOLS, GRID_SIZE } from '../constants/gameConstants';

export const generateGrid = () => {
  const newGrid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    const row = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      row.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }
    newGrid.push(row);
  }
  return newGrid;
};
