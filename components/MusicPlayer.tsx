"use client";

import { useEffect, useRef, useState } from "react";

const playlist = [
  "/assets/music/01_Day_One_Dust.mp3",
  "/assets/music/02_Cornfield_Chase.mp3",
];

const targetVolume = 0.1;
const fadeStepMs = 40;
const fadeDurationMs = 520;
const storageKey = "grey-music-player-state";

let sharedAudio: HTMLAudioElement | null = null;
let sharedTrackIndex = 0;
let sharedIsPlaying = false;
let sharedWantsPlayback = true;
let fadeTimer: number | null = null;
let unlockListenersAttached = false;
const listeners = new Set<(isPlaying: boolean) => void>();

type MusicState = {
  currentTime?: number;
  shouldPlay?: boolean;
  trackIndex?: number;
};

function notifyListeners() {
  listeners.forEach((listener) => listener(sharedIsPlaying));
}

function readState(): MusicState {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || "{}") as MusicState;
  } catch (_error) {
    return {};
  }
}

function saveState(audio = sharedAudio) {
  if (typeof window === "undefined") return;

  const state: MusicState = {
    currentTime: audio && Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
    shouldPlay: sharedWantsPlayback,
    trackIndex: sharedTrackIndex,
  };

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (_error) {
    // Storage can be unavailable in strict privacy modes.
  }
}

function getAudio() {
  if (sharedAudio) return sharedAudio;

  const savedState = readState();
  sharedTrackIndex =
    typeof savedState.trackIndex === "number" && playlist[savedState.trackIndex]
      ? savedState.trackIndex
      : 0;
  sharedWantsPlayback = savedState.shouldPlay ?? true;

  sharedAudio = new Audio(playlist[sharedTrackIndex]);
  sharedAudio.preload = "metadata";
  sharedAudio.volume = 0;

  sharedAudio.addEventListener(
    "loadedmetadata",
    () => {
      if (!sharedAudio) return;
      const nextTime = savedState.currentTime ?? 0;

      if (nextTime > 0 && Number.isFinite(nextTime) && nextTime < sharedAudio.duration) {
        sharedAudio.currentTime = nextTime;
      }
    },
    { once: true },
  );

  sharedAudio.addEventListener("ended", () => {
    sharedTrackIndex = (sharedTrackIndex + 1) % playlist.length;
    if (!sharedAudio) return;
    sharedAudio.src = playlist[sharedTrackIndex];
    sharedAudio.volume = 0;
    saveState(sharedAudio);
    void startPlayback(false);
  });

  sharedAudio.addEventListener("timeupdate", () => {
    saveState(sharedAudio);
  });

  sharedAudio.addEventListener("pause", () => {
    sharedIsPlaying = false;
    saveState(sharedAudio);
    notifyListeners();
  });

  sharedAudio.addEventListener("play", () => {
    sharedIsPlaying = true;
    sharedWantsPlayback = true;
    saveState(sharedAudio);
    notifyListeners();
  });

  return sharedAudio;
}

function fadeAudio(audio: HTMLAudioElement, nextVolume: number, onComplete?: () => void) {
  if (fadeTimer) {
    window.clearInterval(fadeTimer);
    fadeTimer = null;
  }

  const startVolume = audio.volume;
  const steps = Math.max(1, Math.round(fadeDurationMs / fadeStepMs));
  let step = 0;

  fadeTimer = window.setInterval(() => {
    step += 1;
    const progress = Math.min(1, step / steps);
    audio.volume = startVolume + (nextVolume - startVolume) * progress;

    if (progress >= 1) {
      if (fadeTimer) window.clearInterval(fadeTimer);
      fadeTimer = null;
      onComplete?.();
    }
  }, fadeStepMs);
}

function removeUnlockListeners() {
  window.removeEventListener("pointerdown", handleUnlockPlayback);
  window.removeEventListener("keydown", handleUnlockPlayback);
  window.removeEventListener("wheel", handleUnlockPlayback);
  window.removeEventListener("touchstart", handleUnlockPlayback);
  unlockListenersAttached = false;
}

function addUnlockListeners() {
  if (unlockListenersAttached || !sharedWantsPlayback) return;

  unlockListenersAttached = true;
  window.addEventListener("pointerdown", handleUnlockPlayback, { once: true });
  window.addEventListener("keydown", handleUnlockPlayback, { once: true });
  window.addEventListener("wheel", handleUnlockPlayback, { once: true });
  window.addEventListener("touchstart", handleUnlockPlayback, { once: true });
}

function handleUnlockPlayback(event?: Event) {
  removeUnlockListeners();

  const target = event?.target;

  if (target instanceof Element && target.closest(".music-player-button")) {
    return;
  }

  if (sharedWantsPlayback) {
    void startPlayback();
  }
}

async function startPlayback(fade = true) {
  const audio = getAudio();

  try {
    audio.volume = fade ? 0 : targetVolume;
    await audio.play();

    if (fade) {
      fadeAudio(audio, targetVolume);
    }
  } catch (_error) {
    sharedIsPlaying = false;
    notifyListeners();
    addUnlockListeners();
  }
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(sharedIsPlaying);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const audio = getAudio();

    listeners.add(setIsPlaying);
    setIsPlaying(sharedIsPlaying);

    if (sharedWantsPlayback && audio.paused) {
      void startPlayback();
    }

    const handleBeforeUnload = () => saveState(audio);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleBeforeUnload);

    return () => {
      listeners.delete(setIsPlaying);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleBeforeUnload);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = getAudio();

    if (sharedIsPlaying) {
      sharedWantsPlayback = false;
      removeUnlockListeners();
      saveState(audio);
      fadeAudio(audio, 0, () => {
        audio.pause();
      });
      return;
    }

    sharedWantsPlayback = true;
    saveState(audio);
    await startPlayback();
  };

  return (
    <button
      ref={buttonRef}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      aria-pressed={isPlaying}
      className="music-player-button"
      data-no-transition="true"
      type="button"
      onClick={togglePlayback}
    >
      <span className={isPlaying ? "music-player-disc is-playing" : "music-player-disc"}>
        <span className="music-player-ring" />
        <span className="music-player-hole" />
      </span>
    </button>
  );
}
