import { MULTIPLIERS } from "../constants/gameConstants";

export const calculateWinAmount = (clusters, betAmount = 1) => {
  let totalWin = 0;
  clusters.forEach((cluster) => {
    const multiplier = MULTIPLIERS[cluster.symbol];
    const win = cluster.count * multiplier * betAmount;
    totalWin += win;
  });
  return totalWin;
};

export const getWinningCells = (clusters) => {
  const winCells = new Set();
  clusters.forEach((cluster) => {
    cluster.cells.forEach(([row, col]) => {
      winCells.add(`${row},${col}`);
    });
  });
  return winCells;
};
