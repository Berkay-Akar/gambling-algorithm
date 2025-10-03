import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

const GameButtons = ({ playGame, resetBalance, isPlaying, balance, selectedBet }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={playGame}
        disabled={isPlaying || balance < selectedBet}
        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg disabled:cursor-not-allowed"
      >
        <Play className="w-6 h-6" />
        {isPlaying ? 'Playing...' : `Play ($${selectedBet})`}
      </button>
      {balance === 0 && (
        <button
          onClick={resetBalance}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      )}
    </div>
  );
};

export default GameButtons;
