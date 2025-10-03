import React from 'react';

const GridCell = ({ symbol, isWinning, dropDistance }) => {
  return (
    <div
      className={`aspect-square flex items-center justify-center text-4xl rounded-lg transition-all ${
        isWinning
          ? 'bg-yellow-400 scale-110 shadow-lg shadow-yellow-500/50 duration-300'
          : 'bg-white/20'
      }`}
      style={{
        animation: dropDistance !== 0 ? `fall 0.6s ease-out` : 'none',
        '--drop-distance': `${dropDistance * 100}%`
      }}
    >
      {symbol}
    </div>
  );
};

export default GridCell;
