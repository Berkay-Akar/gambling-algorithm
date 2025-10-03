import React from "react";
import { BET_AMOUNTS } from "../constants/gameConstants";

const BetSelector = ({ selectedBet, setSelectedBet, isPlaying }) => {
  return (
    <div className="mb-4">
      <p className="text-white/70 text-sm mb-2">Bet Amount</p>
      <div className="flex flex-wrap gap-2">
        {BET_AMOUNTS.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedBet(amount)}
            disabled={isPlaying}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedBet === amount
                ? "bg-yellow-500 text-black"
                : "bg-white/20 text-white hover:bg-white/30"
            } ${isPlaying ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            ${amount.toFixed(2)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BetSelector;
