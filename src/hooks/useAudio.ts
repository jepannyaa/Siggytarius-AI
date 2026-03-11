"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Singleton audio state — shared across pages via module-level refs
 * so music doesn't restart when navigating between / and /chat.
 */
let globalBgMusic: HTMLAudioElement | null = null;
let globalClickSfx: HTMLAudioElement | null = null;
let globalHasStarted = false;

export function useAudio() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Init audio only once across all mounts
    if (!globalBgMusic) {
      const music = new Audio("/audio/bg-music.mp3");
      music.loop = true;
      music.volume = 0.25;
      globalBgMusic = music;
    }
    if (!globalClickSfx) {
      const click = new Audio("/audio/click.mp3");
      click.volume = 0.5;
      globalClickSfx = click;
    }

    // Sync local state
    if (mountedRef.current) {
      setIsMusicPlaying(!globalBgMusic.paused && globalHasStarted);
    }

    // Try auto-play immediately on mount
    if (!globalHasStarted && globalBgMusic) {
      globalBgMusic.play().then(() => {
        globalHasStarted = true;
        if (mountedRef.current) setIsMusicPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay — fallback: start on first interaction
        const startOnInteraction = () => {
          if (!globalHasStarted && globalBgMusic) {
            globalBgMusic.play().then(() => {
              globalHasStarted = true;
              if (mountedRef.current) setIsMusicPlaying(true);
            }).catch(() => {});
          }
          window.removeEventListener("pointerdown", startOnInteraction);
          window.removeEventListener("keydown", startOnInteraction);
        };
        window.addEventListener("pointerdown", startOnInteraction);
        window.addEventListener("keydown", startOnInteraction);
      });
    }

    return () => {
      mountedRef.current = false;
    };
  }, []);

  /** Play click SFX — clones node to allow rapid clicks */
  const playClick = useCallback(() => {
    if (globalClickSfx) {
      const sfx = globalClickSfx.cloneNode() as HTMLAudioElement;
      sfx.volume = 0.45;
      sfx.play().catch(() => {});
    }
  }, []);

  /** Toggle background music on/off */
  const toggleMusic = useCallback(() => {
    if (!globalBgMusic) return;
    if (!globalBgMusic.paused) {
      globalBgMusic.pause();
      setIsMusicPlaying(false);
    } else {
      globalBgMusic.play().then(() => setIsMusicPlaying(true)).catch(() => {});
      globalHasStarted = true;
    }
  }, []);

  return { isMusicPlaying, playClick, toggleMusic };
}
