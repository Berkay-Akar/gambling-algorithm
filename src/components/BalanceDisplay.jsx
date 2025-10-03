import React from "react";

const BalanceDisplay = ({ balance, lastWin, cascadeCount }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-white/70 text-sm mb-1">Balance</p>
        <p className="text-3xl font-bold text-white">${balance}</p>
      </div>
      {lastWin > 0 && (
        <div className="text-right">
          <p className="text-green-300 text-sm mb-1">
            Total Win {cascadeCount > 0 && `(${cascadeCount}x Cascade)`}
          </p>
          <p className="text-3xl font-bold text-green-400">+${lastWin}</p>
        </div>
      )}
    </div>
  );
};

export default BalanceDisplay;
