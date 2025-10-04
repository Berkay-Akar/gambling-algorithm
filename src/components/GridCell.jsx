import React from "react";

import { SYMBOL_COLORS } from "../constants/gameConstants";

const GridCell = ({ symbol, isWinning, dropDistance, isExploding }) => {
  const getBgClass = () => {
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
      className={`aspect-square flex items-center justify-center text-4xl rounded-lg transition-all ${getBgClass()}`}
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
