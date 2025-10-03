import React from 'react';
import GridCell from './GridCell';

const GameGrid = ({ grid, winningCells, fallingCells }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {grid.map((row, i) =>
        row.map((symbol, j) => {
          const key = `${i},${j}`;
          const isWinning = winningCells.has(key);
          const dropDistance = fallingCells.get(key) || 0;
          
          return (
            <GridCell
              key={key}
              symbol={symbol}
              isWinning={isWinning}
              dropDistance={dropDistance}
            />
          );
        })
      )}
    </div>
  );
};

export default GameGrid;
