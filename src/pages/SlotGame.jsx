import React from 'react';
import { useSlotGame } from '../hooks/useSlotGame';
import GameHeader from '../components/GameHeader';
import BalanceDisplay from '../components/BalanceDisplay';
import BetSelector from '../components/BetSelector';
import GameButtons from '../components/GameButtons';
import GameGrid from '../components/GameGrid';
import MultiplierTable from '../components/MultiplierTable';

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
    playGame,
    resetBalance
  } = useSlotGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <GameHeader />

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <BalanceDisplay 
            balance={balance} 
            lastWin={lastWin} 
            cascadeCount={cascadeCount} 
          />

          <BetSelector 
            selectedBet={selectedBet}
            setSelectedBet={setSelectedBet}
            isPlaying={isPlaying}
          />

          <GameButtons 
            playGame={playGame}
            resetBalance={resetBalance}
            isPlaying={isPlaying}
            balance={balance}
            selectedBet={selectedBet}
          />
        </div>

        {grid.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <GameGrid 
              grid={grid}
              winningCells={winningCells}
              fallingCells={fallingCells}
            />
            
            <MultiplierTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotGame;
