import React from "react";

import { SYMBOL_COLORS, MULTIPLIER_SYMBOLS } from "../constants/gameConstants";

const GridCell = ({ symbol, isWinning, dropDistance, isExploding }) => {
  // Check if this is a multiplier symbol
  const isMultiplier = symbol in MULTIPLIER_SYMBOLS;

  const getBgClass = () => {
    if (isMultiplier) {
      // Multipliers get a golden gradient background
      if (isExploding) {
        return "bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400";
      }
      if (isWinning) {
        return "bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400";
      }
      return "bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-300";
    }

    if (isExploding) {
      return `${SYMBOL_COLORS[symbol] || "bg-yellow-400"}`;
    }
    if (isWinning) {
      return `${SYMBOL_COLORS[symbol] || "bg-yellow-400"}`;
    }
    return "bg-white/20";
  };

  const getAnimation = () => {
    if (isExploding) {
      return "explode 0.6s ease-out forwards";
    }
    if (dropDistance !== 0) {
      return "fall 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
    }
    if (isWinning) {
      return "pulse 0.4s ease-in-out, winGlow 1.2s ease-in-out";
    }
    return "none";
  };

  return (
    <div
      className={`aspect-square flex items-center justify-center rounded-lg transition-all ${getBgClass()} ${
        isMultiplier
          ? "font-black text-2xl text-white shadow-xl border-2 border-yellow-500"
          : "text-4xl"
      }`}
      style={{
        animation: getAnimation(),
        "--drop-distance": `${dropDistance * 100}%`,
      }}
    >
      {symbol}
    </div>
  );
};

export default GridCell;
