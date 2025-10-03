# 🎰 Cascade Slot Game

Professional React slot game with cascade mechanics, built with modern frontend architecture.

## 📁 Project Structure

```
gambling-algorithym/
├── src/
│   ├── components/          # React components
│   │   ├── BalanceDisplay.jsx
│   │   ├── BetSelector.jsx
│   │   ├── GameButtons.jsx
│   │   ├── GameGrid.jsx
│   │   ├── GridCell.jsx
│   │   ├── GameHeader.jsx
│   │   └── MultiplierTable.jsx
│   ├── constants/           # Game configuration
│   │   └── gameConstants.js
│   ├── hooks/              # Custom React hooks
│   │   └── useSlotGame.js
│   ├── pages/              # Page components
│   │   └── SlotGame.jsx
│   ├── styles/             # Global styles
│   │   └── index.css
│   ├── utils/              # Business logic
│   │   ├── cascadeHandler.js
│   │   ├── clusterFinder.js
│   │   ├── gridGenerator.js
│   │   └── winCalculator.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎮 Features

- ✨ Cascade mechanics with falling symbols
- 🎯 Cluster-based winning system
- 💰 Multiple bet amounts
- 🎨 Smooth animations
- 📱 Responsive design
- ⚡ Built with Vite + React + Tailwind CSS

## 🏗️ Architecture

### Components

- **Atomic design pattern** - Small, reusable components
- **Separation of concerns** - UI components separate from logic

### Hooks

- **useSlotGame** - Main game logic and state management
- Custom hooks for clean component code

### Utils

- Pure functions for game mechanics
- Testable business logic
- No side effects

### Constants

- Centralized configuration
- Easy to modify game parameters

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📝 Code Quality

- Clean, readable code
- Professional file structure
- Modular architecture
- Performance optimized
- TypeScript-ready structure
