import React, { useState } from "react";
import { PlayCircle, X, PauseCircle } from "lucide-react";

const AutoPlay = ({
  isAutoPlaying,
  startAutoPlay,
  stopAutoPlay,
  isPlaying,
  autoPlayCount,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCount, setSelectedCount] = useState(10);

  const autoPlayOptions = [10, 25, 50, 100, 250, 500];

  const handleAutoPlayClick = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      setShowModal(true);
    }
  };

  const handleStartAutoPlay = (count) => {
    startAutoPlay(count);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleAutoPlayClick}
        disabled={isPlaying && !isAutoPlaying}
        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all flex items-center justify-center border-2 border-white/30 disabled:cursor-not-allowed disabled:bg-gray-600 relative"
        title={isAutoPlaying ? "Stop Auto Play" : "Start Auto Play"}
      >
        {isAutoPlaying ? (
          <>
            <PauseCircle className="w-6 h-6 text-white" />
            {autoPlayCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {autoPlayCount}
              </div>
            )}
          </>
        ) : (
          <PlayCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl border-4 border-white/30 max-w-md w-full mx-4 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Auto Play</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:text-red-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-white/90 mb-6">
              Select how many spins to play automatically:
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {autoPlayOptions.map((count) => (
                <button
                  key={count}
                  onClick={() => setSelectedCount(count)}
                  className={`py-3 px-4 rounded-xl font-bold transition-all ${
                    selectedCount === count
                      ? "bg-yellow-400 text-purple-900 scale-105 shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStartAutoPlay(selectedCount)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AutoPlay;
