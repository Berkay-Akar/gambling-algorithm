import React from "react";
import GridCell from "./GridCell";

const GameGrid = ({ grid, winningCells, fallingCells, explodingCells }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {grid.map((row, i) =>
        row.map((symbol, j) => {
          const key = `${i},${j}`;
          const isWinning = winningCells.has(key);
          const isExploding = explodingCells.has(key);
          const dropDistance = fallingCells.get(key) || 0;

          return (
            <GridCell
              key={key}
              symbol={symbol}
              isWinning={isWinning}
              isExploding={isExploding}
              dropDistance={dropDistance}
            />
          );
        })
      )}
    </div>
  );
};

export default GameGrid;
