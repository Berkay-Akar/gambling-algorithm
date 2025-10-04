import React from "react";
import { useSlotGame } from "../hooks/useSlotGame";
import BetSelector from "../components/BetSelector";
import GameButtons from "../components/GameButtons";
import GameGrid from "../components/GameGrid";

const SlotGame = () => {
  const {
    balance,
    selectedBet,
    setSelectedBet,
    grid,
    isPlaying,
    lastWin,
    winningCells,
    cascadeCount,
    fallingCells,
    explodingCells,
    playGame,
    resetBalance,
  } = useSlotGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-purple-200 p-4 flex items-center justify-center">
      <div className="w-full max-w-7xl flex gap-4 items-center">
        {/* Left Panel - Controls */}
        <div className="flex flex-col gap-4 w-48">
          {/* Balance */}
          <div className="bg-purple-600 rounded-2xl p-4 shadow-xl border-4 border-white/50">
            <p className="text-white/90 text-xs font-semibold mb-1">CREDIT</p>
            <p className="text-2xl font-bold text-yellow-300">
              ${balance.toFixed(2)}
            </p>
          </div>

          {/* Bet Controls */}
          <div className="bg-gradient-to-b from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-xl border-4 border-white/50">
            <BetSelector
              selectedBet={selectedBet}
              setSelectedBet={setSelectedBet}
              isPlaying={isPlaying}
            />
          </div>

          {/* Play Button */}
          <div className="flex justify-center">
            <GameButtons
              playGame={playGame}
              resetBalance={resetBalance}
              isPlaying={isPlaying}
              balance={balance}
              selectedBet={selectedBet}
            />
          </div>

          {/* Last Win */}
          {lastWin > 0 && (
            <div className="bg-green-600 rounded-2xl p-4 shadow-xl border-4 border-white/50">
              <p className="text-white/90 text-xs font-semibold mb-1">
                WIN {cascadeCount > 0 && `(${cascadeCount}x)`}
              </p>
              <p className="text-2xl font-bold text-yellow-300">
                +${lastWin.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Right Panel - Game Grid */}
        <div className="flex-1 max-w-4xl">
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-6 shadow-2xl border-8 border-yellow-300">
            <div className="text-center mb-4">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-lg">
                🍭 Sweet Slots 🍭
              </h1>
            </div>
            {grid.length > 0 ? (
              <GameGrid
                grid={grid}
                winningCells={winningCells}
                fallingCells={fallingCells}
                explodingCells={explodingCells}
              />
            ) : (
              <div className="grid grid-cols-6 gap-2 opacity-30">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-white/40 rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotGame;
