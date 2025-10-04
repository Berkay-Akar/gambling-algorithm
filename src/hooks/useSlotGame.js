import { useState, useCallback } from "react";
import { INITIAL_BALANCE, ANIMATION_DELAYS } from "../constants/gameConstants";
import { generateGrid } from "../utils/gridGenerator";
import { findClusters } from "../utils/clusterFinder";
import { removeClusterAndDrop } from "../utils/cascadeHandler";
import { calculateWinAmount, getWinningCells } from "../utils/winCalculator";

export const useSlotGame = () => {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [selectedBet, setSelectedBet] = useState(10);
  const [grid, setGrid] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [winningCells, setWinningCells] = useState(new Set());
  const [cascadeCount, setCascadeCount] = useState(0);
  const [fallingCells, setFallingCells] = useState(new Map());
  const [explodingCells, setExplodingCells] = useState(new Set());

  const processCascades = useCallback(
    async (initialGrid, betAmount, totalWin = 0, cascades = 0) => {
      let currentGrid = initialGrid;
      let currentTotalWin = totalWin;
      let currentCascades = cascades;

      while (true) {
        const clusters = findClusters(currentGrid);

        if (clusters.length === 0) {
          break;
        }

        const cascadeWin = calculateWinAmount(clusters, betAmount);
        const winCells = getWinningCells(clusters);

        currentTotalWin += cascadeWin;
        currentCascades++;

        // Phase 1: Show winning cells with pulse animation
        setWinningCells(winCells);
        setLastWin(currentTotalWin);
        setCascadeCount(currentCascades);
        setBalance((prev) => prev + cascadeWin);

        await new Promise((resolve) =>
          setTimeout(resolve, ANIMATION_DELAYS.WIN_PULSE)
        );

        // Phase 2: Explosion animation
        setExplodingCells(winCells);
        setWinningCells(new Set());

        await new Promise((resolve) =>
          setTimeout(resolve, ANIMATION_DELAYS.EXPLOSION)
        );

        // Phase 3: Drop new symbols
        const { newGrid, falling } = removeClusterAndDrop(
          currentGrid,
          clusters
        );
        setGrid(newGrid);
        setExplodingCells(new Set());
        setFallingCells(falling);

        await new Promise((resolve) =>
          setTimeout(resolve, ANIMATION_DELAYS.CASCADE_DROP)
        );
        setFallingCells(new Map());

        currentGrid = newGrid;
      }

      return { finalGrid: currentGrid, totalWin: currentTotalWin };
    },
    []
  );

  const playGame = useCallback(async () => {
    if (balance < selectedBet) {
      alert("Insufficient balance!");
      return;
    }

    setIsPlaying(true);
    setBalance(balance - selectedBet);
    setLastWin(0);
    setWinningCells(new Set());
    setCascadeCount(0);
    setFallingCells(new Map());
    setExplodingCells(new Set());

    const newGrid = generateGrid();
    setGrid(newGrid);

    await new Promise((resolve) =>
      setTimeout(resolve, ANIMATION_DELAYS.INITIAL_GRID)
    );

    await processCascades(newGrid, selectedBet);

    setIsPlaying(false);
  }, [balance, selectedBet, processCascades]);

  const resetBalance = useCallback(() => {
    setBalance(INITIAL_BALANCE);
    setGrid([]);
    setLastWin(0);
    setWinningCells(new Set());
    setCascadeCount(0);
    setFallingCells(new Map());
    setExplodingCells(new Set());
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
    explodingCells,
    playGame,
    resetBalance,
  };
};
