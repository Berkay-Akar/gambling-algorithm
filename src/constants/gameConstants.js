export const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "💎", "⭐"];

export const MULTIPLIERS = {
  "🍒": 0.1,
  "🍋": 0.3,
  "🍊": 0.4,
  "🍇": 0.5,
  "💎": 0.8,
  "⭐": 1,
};

export const SYMBOL_COLORS = {
  "🍒": "bg-red-400",
  "🍋": "bg-yellow-300",
  "🍊": "bg-orange-300",
  "🍇": "bg-purple-400",
  "💎": "bg-cyan-300",
  "⭐": "bg-yellow-400",
};

// Multiplier symbols with their values
export const MULTIPLIER_SYMBOLS = {
  "2x": 2,
  "5x": 5,
  "10x": 10,
  "25x": 25,
  "50x": 50,
  "100x": 100,
};

export const MULTIPLIER_WEIGHTS = {
  "2x": 40,
  "5x": 30,
  "10x": 15,
  "25x": 8,
  "50x": 5,
  "100x": 2,
};

// Chance of getting a multiplier instead of regular symbol (2% chance)
export const MULTIPLIER_SPAWN_CHANCE = 0.02;

export const GRID_ROWS = 5;
export const GRID_COLS = 6;
export const BET_AMOUNTS = [10, 20, 30, 40, 50, 75, 100, 150, 200];
export const BET_INCREMENT = 10;
export const MIN_BET = 10;
export const MAX_BET = 200;
export const INITIAL_BALANCE = 1000;
export const MIN_CLUSTER_SIZE = 5;

export const ANIMATION_DELAYS = {
  WIN_DISPLAY: 1200,
  WIN_PULSE: 400,
  EXPLOSION: 600,
  CASCADE_DROP: 800,
  INITIAL_GRID: 1000,
};
