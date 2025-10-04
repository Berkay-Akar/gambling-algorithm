//just a button for autoplay while selectng time
import React from "react";
import { PlayCircle, PauseCircle } from "lucide-react";

const AutoPlay = ({ isAutoPlaying, toggleAutoPlay, isPlaying }) => {
  return (
    <button
      onClick={toggleAutoPlay}
      disabled={isPlaying}
      className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all flex items-center justify-center border-2 border-white/30 disabled:cursor-not-allowed"
      title={isAutoPlaying ? "Stop Auto Play" : "Start Auto Play"}
    >
      {isAutoPlaying ? (
        <PauseCircle className="w-6 h-6 text-white" />
      ) : (
        <PlayCircle className="w-6 h-6 text-white" />
      )}
    </button>
  );
};

export default AutoPlay;
