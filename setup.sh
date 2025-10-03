#!/bin/bash

# Create directory structure
mkdir -p src/{components,constants,hooks,pages,styles,utils}

# Create constants
cat > src/constants/gameConstants.js << 'EOF'
export const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "💎", "⭐"];

export const MULTIPLIERS = {
  "🍒": 2,
  "🍋": 3,
  "🍊": 4,
  "🍇": 5,
  "💎": 8,
  "⭐": 10,
};

export const GRID_SIZE = 6;
export const BET_AMOUNTS = [10, 20, 30, 40, 50, 75, 100, 150, 200];
export const INITIAL_BALANCE = 1000;
export const MIN_CLUSTER_SIZE = 4;

export const ANIMATION_DELAYS = {
  WIN_DISPLAY: 700,
  CASCADE_DROP: 600,
  INITIAL_GRID: 800,
};
EOF

# Create utils
cat > src/utils/gridGenerator.js << 'EOF'
import { SYMBOLS, GRID_SIZE } from '../constants/gameConstants';

export const generateGrid = () => {
  const newGrid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    const row = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      row.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }
    newGrid.push(row);
  }
  return newGrid;
};
EOF

cat > src/utils/clusterFinder.js << 'EOF'
import { GRID_SIZE, MIN_CLUSTER_SIZE } from '../constants/gameConstants';

export const findClusters = (grid) => {
  const visited = new Set();
  const clusters = [];

  const dfs = (row, col, symbol, cluster) => {
    const key = `${row},${col}`;
    
    if (
      row < 0 || row >= GRID_SIZE ||
      col < 0 || col >= GRID_SIZE ||
      visited.has(key) ||
      grid[row][col] !== symbol
    ) {
      return;
    }

    visited.add(key);
    cluster.push([row, col]);

    dfs(row - 1, col, symbol, cluster);
    dfs(row + 1, col, symbol, cluster);
    dfs(row, col - 1, symbol, cluster);
    dfs(row, col + 1, symbol, cluster);
  };

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const key = `${i},${j}`;
      if (!visited.has(key)) {
        const cluster = [];
        dfs(i, j, grid[i][j], cluster);
        
        if (cluster.length >= MIN_CLUSTER_SIZE) {
          clusters.push({
            symbol: grid[i][j],
            cells: cluster,
            count: cluster.length
          });
        }
      }
    }
  }

  return clusters;
};
EOF

cat > src/utils/cascadeHandler.js << 'EOF'
import { SYMBOLS, GRID_SIZE } from '../constants/gameConstants';

export const removeClusterAndDrop = (grid, clusters) => {
  const newGrid = grid.map(row => [...row]);
  const falling = new Map();
  
  clusters.forEach(cluster => {
    cluster.cells.forEach(([row, col]) => {
      newGrid[row][col] = null;
    });
  });

  for (let col = 0; col < GRID_SIZE; col++) {
    const column = [];
    const oldPositions = [];
    
    for (let row = GRID_SIZE - 1; row >= 0; row--) {
      if (newGrid[row][col] !== null) {
        column.push(newGrid[row][col]);
        oldPositions.push(row);
      }
    }
    
    const emptyCount = GRID_SIZE - column.length;
    const newSymbols = [];
    for (let i = 0; i < emptyCount; i++) {
      newSymbols.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }
    
    const allSymbols = [...newSymbols, ...column];
    
    for (let row = 0; row < GRID_SIZE; row++) {
      newGrid[row][col] = allSymbols[row];
      
      let dropDistance = 0;
      if (row < emptyCount) {
        dropDistance = -(emptyCount - row);
      } else {
        const oldIndex = row - emptyCount;
        if (oldIndex < oldPositions.length) {
          dropDistance = oldPositions[oldIndex] - row;
        }
      }
      
      if (dropDistance !== 0) {
        falling.set(`${row},${col}`, dropDistance);
      }
    }
  }
  
  return { newGrid, falling };
};
EOF

cat > src/utils/winCalculator.js << 'EOF'
import { MULTIPLIERS } from '../constants/gameConstants';

export const calculateWinAmount = (clusters) => {
  let totalWin = 0;
  clusters.forEach(cluster => {
    const multiplier = MULTIPLIERS[cluster.symbol];
    const win = cluster.count * multiplier;
    totalWin += win;
  });
  return totalWin;
};

export const getWinningCells = (clusters) => {
  const winCells = new Set();
  clusters.forEach(cluster => {
    cluster.cells.forEach(([row, col]) => {
      winCells.add(`${row},${col}`);
    });
  });
  return winCells;
};
EOF

# Create components
cat > src/components/GameHeader.jsx << 'EOF'
import React from 'react';
import { Coins } from 'lucide-react';

const GameHeader = () => {
  return (
    <h1 className="text-4xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
      <Coins className="w-10 h-10" />
      Cascade Slot Oyunu
    </h1>
  );
};

export default GameHeader;
EOF

cat > src/components/BalanceDisplay.jsx << 'EOF'
import React from 'react';

const BalanceDisplay = ({ balance, lastWin, cascadeCount }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-white/70 text-sm mb-1">Bakiye</p>
        <p className="text-3xl font-bold text-white">{balance} ₺</p>
      </div>
      {lastWin > 0 && (
        <div className="text-right">
          <p className="text-green-300 text-sm mb-1">
            Toplam Kazanç {cascadeCount > 0 && `(${cascadeCount}x Cascade)`}
          </p>
          <p className="text-3xl font-bold text-green-400">+{lastWin} ₺</p>
        </div>
      )}
    </div>
  );
};

export default BalanceDisplay;
EOF

cat > src/components/BetSelector.jsx << 'EOF'
import React from 'react';
import { BET_AMOUNTS } from '../constants/gameConstants';

const BetSelector = ({ selectedBet, setSelectedBet, isPlaying }) => {
  return (
    <div className="mb-4">
      <p className="text-white/70 text-sm mb-2">Bahis Miktarı</p>
      <div className="flex flex-wrap gap-2">
        {BET_AMOUNTS.map(amount => (
          <button
            key={amount}
            onClick={() => setSelectedBet(amount)}
            disabled={isPlaying}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedBet === amount
                ? 'bg-yellow-500 text-black'
                : 'bg-white/20 text-white hover:bg-white/30'
            } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {amount} ₺
          </button>
        ))}
      </div>
    </div>
  );
};

export default BetSelector;
EOF

cat > src/components/GameButtons.jsx << 'EOF'
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
        {isPlaying ? 'Oynanıyor...' : `Oyna (${selectedBet} ₺)`}
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
EOF

cat > src/components/GridCell.jsx << 'EOF'
import React from 'react';

const GridCell = ({ symbol, isWinning, dropDistance }) => {
  return (
    <div
      className={`aspect-square flex items-center justify-center text-4xl rounded-lg transition-all ${
        isWinning
          ? 'bg-yellow-400 scale-110 shadow-lg shadow-yellow-500/50 duration-300'
          : 'bg-white/20'
      }`}
      style={{
        animation: dropDistance !== 0 ? `fall 0.6s ease-out` : 'none',
        '--drop-distance': `${dropDistance * 100}%`
      }}
    >
      {symbol}
    </div>
  );
};

export default GridCell;
EOF

cat > src/components/GameGrid.jsx << 'EOF'
import React from 'react';
import GridCell from './GridCell';

const GameGrid = ({ grid, winningCells, fallingCells }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {grid.map((row, i) =>
        row.map((symbol, j) => {
          const key = `${i},${j}`;
          const isWinning = winningCells.has(key);
          const dropDistance = fallingCells.get(key) || 0;
          
          return (
            <GridCell
              key={key}
              symbol={symbol}
              isWinning={isWinning}
              dropDistance={dropDistance}
            />
          );
        })
      )}
    </div>
  );
};

export default GameGrid;
EOF

cat > src/components/MultiplierTable.jsx << 'EOF'
import React from 'react';
import { SYMBOLS, MULTIPLIERS } from '../constants/gameConstants';

const MultiplierTable = () => {
  return (
    <div className="mt-6 pt-6 border-t border-white/20">
      <p className="text-white/70 text-sm mb-3">
        Katsayılar (4+ bitişik sembol gerekli)
      </p>
      <div className="grid grid-cols-3 gap-3">
        {SYMBOLS.map(symbol => (
          <div 
            key={symbol} 
            className="bg-white/10 rounded-lg p-2 flex items-center justify-between"
          >
            <span className="text-2xl">{symbol}</span>
            <span className="text-white font-semibold">x{MULTIPLIERS[symbol]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiplierTable;
EOF

# Create hooks
cat > src/hooks/useSlotGame.js << 'EOF'
import { useState, useCallback } from 'react';
import { INITIAL_BALANCE, ANIMATION_DELAYS } from '../constants/gameConstants';
import { generateGrid } from '../utils/gridGenerator';
import { findClusters } from '../utils/clusterFinder';
import { removeClusterAndDrop } from '../utils/cascadeHandler';
import { calculateWinAmount, getWinningCells } from '../utils/winCalculator';

export const useSlotGame = () => {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [selectedBet, setSelectedBet] = useState(10);
  const [grid, setGrid] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [winningCells, setWinningCells] = useState(new Set());
  const [cascadeCount, setCascadeCount] = useState(0);
  const [fallingCells, setFallingCells] = useState(new Map());

  const processCascades = useCallback(async (initialGrid, totalWin = 0, cascades = 0) => {
    let currentGrid = initialGrid;
    let currentTotalWin = totalWin;
    let currentCascades = cascades;

    while (true) {
      const clusters = findClusters(currentGrid);
      
      if (clusters.length === 0) {
        break;
      }

      const cascadeWin = calculateWinAmount(clusters);
      const winCells = getWinningCells(clusters);

      currentTotalWin += cascadeWin;
      currentCascades++;
      
      setWinningCells(winCells);
      setLastWin(currentTotalWin);
      setCascadeCount(currentCascades);
      setBalance(prev => prev + cascadeWin);
      
      await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAYS.WIN_DISPLAY));

      const { newGrid, falling } = removeClusterAndDrop(currentGrid, clusters);
      setGrid(newGrid);
      setWinningCells(new Set());
      setFallingCells(falling);
      
      await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAYS.CASCADE_DROP));
      setFallingCells(new Map());
      
      currentGrid = newGrid;
    }

    return { finalGrid: currentGrid, totalWin: currentTotalWin };
  }, []);

  const playGame = useCallback(async () => {
    if (balance < selectedBet) {
      alert('Yetersiz bakiye!');
      return;
    }

    setIsPlaying(true);
    setBalance(balance - selectedBet);
    setLastWin(0);
    setWinningCells(new Set());
    setCascadeCount(0);
    setFallingCells(new Map());

    const newGrid = generateGrid();
    setGrid(newGrid);

    await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAYS.INITIAL_GRID));

    await processCascades(newGrid);
    
    setIsPlaying(false);
  }, [balance, selectedBet, processCascades]);

  const resetBalance = useCallback(() => {
    setBalance(INITIAL_BALANCE);
    setGrid([]);
    setLastWin(0);
    setWinningCells(new Set());
    setCascadeCount(0);
    setFallingCells(new Map());
  }, []);

  return {
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
  };
};
EOF

# Create pages
cat > src/pages/SlotGame.jsx << 'EOF'
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
EOF

# Create styles
cat > src/styles/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes fall {
  from {
    transform: translateY(var(--drop-distance));
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
EOF

# Create App and main
cat > src/App.jsx << 'EOF'
import React from 'react';
import SlotGame from './pages/SlotGame';

const App = () => {
  return <SlotGame />;
};

export default App;
EOF

cat > src/main.jsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

echo "✅ All source files created successfully!"
