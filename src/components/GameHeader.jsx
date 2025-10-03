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
