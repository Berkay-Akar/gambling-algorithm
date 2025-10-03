import React from "react";
import { SYMBOLS, MULTIPLIERS } from "../constants/gameConstants";

const MultiplierTable = () => {
  return (
    <div className="mt-6 pt-6 border-t border-white/20">
      <p className="text-white/70 text-sm mb-3">
        Multipliers (4+ adjacent symbols required)
      </p>
      <div className="grid grid-cols-3 gap-3">
        {SYMBOLS.map((symbol) => (
          <div
            key={symbol}
            className="bg-white/10 rounded-lg p-2 flex items-center justify-between"
          >
            <span className="text-2xl">{symbol}</span>
            <span className="text-white font-semibold">
              x{MULTIPLIERS[symbol]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiplierTable;
