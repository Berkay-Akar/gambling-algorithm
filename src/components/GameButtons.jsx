import React from "react";
import { Play, RotateCcw } from "lucide-react";
import AutoPlay from "./AutoPlay";

const GameButtons = ({
  playGame,
  resetBalance,
  isPlaying,
  balance,
  selectedBet,
  isAutoPlaying,
  autoPlayCount,
  startAutoPlay,
  stopAutoPlay,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={playGame}
        disabled={isPlaying || balance < selectedBet || isAutoPlaying}
        className="w-16 h-16 bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 rounded-full shadow-2xl transition-all flex items-center justify-center disabled:cursor-not-allowed border-4 border-white/30 hover:scale-105 active:scale-95"
        title={isPlaying ? "Playing..." : "Play"}
      >
        <Play className="w-8 h-8 text-white fill-white" />
      </button>
      <AutoPlay
        isAutoPlaying={isAutoPlaying}
        startAutoPlay={startAutoPlay}
        stopAutoPlay={stopAutoPlay}
        isPlaying={isPlaying}
        autoPlayCount={autoPlayCount}
      />
      {balance === 0 && (
        <button
          onClick={resetBalance}
          className="w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-full shadow-lg transition-all flex items-center justify-center border-2 border-white/30"
          title="Reset Balance"
        >
          <RotateCcw className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default GameButtons;
