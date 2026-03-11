"use client";

import { useAudio } from "@/hooks/useAudio";

export function AudioController() {
  const { isMusicPlaying, toggleMusic, playClick } = useAudio();

  const handleToggle = () => {
    playClick();
    toggleMusic();
  };

  return (
    <button
      onClick={handleToggle}
      title={isMusicPlaying ? "Pause Music" : "Play Music"}
      className="
        fixed bottom-5 right-5 z-50
        w-10 h-10 flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        border border-white/20 rounded-full
        text-white/70 hover:text-white
        hover:bg-black/70 hover:border-white/40
        transition-all duration-200
        shadow-lg shadow-black/30
        group
      "
    >
      {isMusicPlaying ? (
        /* Pause icon (two bars) */
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 group-hover:scale-110 transition-transform"
        >
          <rect x="5" y="4" width="4" height="16" rx="1" />
          <rect x="15" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        /* Play icon + music note indicator */
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 group-hover:scale-110 transition-transform"
        >
          <path d="M9 4l12 8-12 8V4z" />
        </svg>
      )}

      {/* Animated equalizer bars when playing */}
      {isMusicPlaying && (
        <span className="absolute -top-1 -right-1 flex gap-0.5 items-end h-3">
          <span className="w-0.5 bg-purple-400 rounded-full animate-eq1" style={{ height: "60%" }} />
          <span className="w-0.5 bg-pink-400 rounded-full animate-eq2" style={{ height: "100%" }} />
          <span className="w-0.5 bg-amber-400 rounded-full animate-eq3" style={{ height: "40%" }} />
        </span>
      )}
    </button>
  );
}
