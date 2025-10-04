import {
  GRID_ROWS,
  GRID_COLS,
  MIN_CLUSTER_SIZE,
} from "../constants/gameConstants";

export const findClusters = (grid) => {
  const visited = new Set();
  const clusters = [];

  const dfs = (row, col, symbol, cluster) => {
    const key = `${row},${col}`;

    if (
      row < 0 ||
      row >= GRID_ROWS ||
      col < 0 ||
      col >= GRID_COLS ||
      visited.has(key) ||
      grid[row][col] !== symbol
    ) {
      return;
    }

    visited.add(key);
    cluster.push([row, col]);

    dfs(row - 1, col, symbol, cluster);
    dfs(row + 1, col, symbol, cluster);
    dfs(row, col - 1, symbol, cluster);
    dfs(row, col + 1, symbol, cluster);
  };

  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLS; j++) {
      const key = `${i},${j}`;
      if (!visited.has(key)) {
        const cluster = [];
        dfs(i, j, grid[i][j], cluster);

        if (cluster.length >= MIN_CLUSTER_SIZE) {
          clusters.push({
            symbol: grid[i][j],
            cells: cluster,
            count: cluster.length,
          });
        }
      }
    }
  }

  return clusters;
};
