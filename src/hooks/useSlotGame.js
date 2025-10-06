import { useState, useCallback, useEffect, useRef } from "react";
import {
  INITIAL_BALANCE,
  ANIMATION_DELAYS,
  MULTIPLIER_SYMBOLS,
} from "../constants/gameConstants";
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayCount, setAutoPlayCount] = useState(0);

  // Function to collect all multipliers from the grid
  const collectMultipliers = useCallback((grid) => {
    const multipliers = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];
        if (cell in MULTIPLIER_SYMBOLS) {
          multipliers.push({
            value: MULTIPLIER_SYMBOLS[cell],
            symbol: cell,
            position: [i, j],
          });
        }
      }
    }
    return multipliers;
  }, []);

  const processCascades = useCallback(
    async (initialGrid, betAmount, totalWin = 0, cascades = 0) => {
      let currentGrid = initialGrid;
      let currentTotalWin = totalWin;
      let currentCascades = cascades;

      // Process all cascades WITHOUT multipliers
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

      // NOW apply multipliers AFTER all cascades are done
      if (currentTotalWin > 0) {
        const multipliers = collectMultipliers(currentGrid);
        if (multipliers.length > 0) {
          const totalMultiplier = multipliers.reduce(
            (sum, m) => sum + m.value,
            0
          );
          const multiplierBonus = currentTotalWin * (totalMultiplier - 1);

          // Update the win and balance with multiplier bonus
          currentTotalWin += multiplierBonus;
          setLastWin(currentTotalWin);
          setBalance((prev) => prev + multiplierBonus);

          // Show a brief animation for multiplier application
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      return { finalGrid: currentGrid, totalWin: currentTotalWin };
    },
    [collectMultipliers]
  );

  const playOneSpin = useCallback(
    async (currentBalance, betAmount) => {
      if (currentBalance < betAmount) {
        return { shouldStop: true, newBalance: currentBalance };
      }

      setIsPlaying(true);
      const newBalance = currentBalance - betAmount;
      setBalance(newBalance);
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

      await processCascades(newGrid, betAmount);

      setIsPlaying(false);

      return { shouldStop: false, newBalance };
    },
    [processCascades]
  );

  const playGame = useCallback(async () => {
    if (balance < selectedBet) {
      alert("Insufficient balance!");
      return;
    }

    await playOneSpin(balance, selectedBet);
  }, [balance, selectedBet, playOneSpin]);

  const autoPlayRef = useRef({ shouldStop: false, remainingSpins: 0 });

  const startAutoPlay = useCallback((count) => {
    setIsAutoPlaying(true);
    setAutoPlayCount(count);
    autoPlayRef.current = { shouldStop: false, remainingSpins: count };
  }, []);

  useEffect(() => {
    const runAutoPlay = async () => {
      if (
        !isAutoPlaying ||
        isPlaying ||
        autoPlayRef.current.remainingSpins <= 0
      ) {
        return;
      }

      if (balance < selectedBet) {
        alert("Insufficient balance! Auto play stopped.");
        setIsAutoPlaying(false);
        setAutoPlayCount(0);
        autoPlayRef.current = { shouldStop: true, remainingSpins: 0 };
        return;
      }

      await playOneSpin(balance, selectedBet);

      autoPlayRef.current.remainingSpins--;
      setAutoPlayCount(autoPlayRef.current.remainingSpins);

      if (autoPlayRef.current.remainingSpins <= 0) {
        setIsAutoPlaying(false);
        setAutoPlayCount(0);
      }
    };

    if (isAutoPlaying && !isPlaying) {
      runAutoPlay();
    }
  }, [isAutoPlaying, isPlaying, balance, selectedBet, playOneSpin]);

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    setAutoPlayCount(0);
    autoPlayRef.current = { shouldStop: true, remainingSpins: 0 };
  }, []);

  const resetBalance = useCallback(() => {
    setBalance(INITIAL_BALANCE);
    setGrid([]);
    setLastWin(0);
    setWinningCells(new Set());
    setCascadeCount(0);
    setFallingCells(new Map());
    setExplodingCells(new Set());
    setIsAutoPlaying(false);
    setAutoPlayCount(0);
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
    isAutoPlaying,
    autoPlayCount,
    playGame,
    resetBalance,
    startAutoPlay,
    stopAutoPlay,
  };
};
