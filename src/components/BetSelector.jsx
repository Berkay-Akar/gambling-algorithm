import React from "react";
import { Minus, Plus } from "lucide-react";
import { MIN_BET, MAX_BET, BET_INCREMENT } from "../constants/gameConstants";

const BetSelector = ({ selectedBet, setSelectedBet, isPlaying }) => {
  const decreaseBet = () => {
    setSelectedBet((prev) => Math.max(MIN_BET, prev - BET_INCREMENT));
  };

  const increaseBet = () => {
    setSelectedBet((prev) => Math.min(MAX_BET, prev + BET_INCREMENT));
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decreaseBet}
        disabled={isPlaying || selectedBet <= MIN_BET}
        className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold transition-all shadow-lg"
      >
        <Minus size={20} />
      </button>

      <div className="bg-green-600 px-6 py-2 rounded-lg shadow-lg">
        <div className="text-white text-xs font-semibold">BET</div>
        <div className="text-white text-xl font-bold">
          ${selectedBet.toFixed(2)}
        </div>
      </div>

      <button
        onClick={increaseBet}
        disabled={isPlaying || selectedBet >= MAX_BET}
        className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold transition-all shadow-lg"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default BetSelector;
