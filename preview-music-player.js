(function () {
  const playlist = [
    "assets/music/01_Day_One_Dust.mp3",
    "assets/music/02_Cornfield_Chase.mp3",
  ];
  const targetVolume = 0.1;
  const fadeStepMs = 40;
  const fadeDurationMs = 520;
  const storageKey = "grey-music-player-state";
  let audio = null;
  let trackIndex = 0;
  let isPlaying = false;
  let wantsPlayback = true;
  let fadeTimer = 0;
  let unlockListenersAttached = false;

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (_error) {
      return {};
    }
  }

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        currentTime: audio && Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
        shouldPlay: wantsPlayback,
        trackIndex,
      }));
    } catch (_error) {
      // Storage can be unavailable in strict privacy modes.
    }
  }

  function addStyles() {
    if (document.getElementById("grey-preview-music-style")) return;

    const style = document.createElement("style");
    style.id = "grey-preview-music-style";
    style.textContent = `
      .music-player-button {
        display: inline-grid;
        flex: 0 0 auto;
        width: 32px;
        height: 32px;
        place-items: center;
        border: 0;
        padding: 0;
        background: transparent;
        color: rgba(255, 255, 255, 0.78);
        cursor: pointer;
        line-height: 0;
        opacity: 0.78;
        transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      header.has-music-player,
      .header.has-music-player,
      .site-header.has-music-player {
        grid-template-columns: 1fr auto auto;
        column-gap: clamp(18px, 3vw, 46px);
      }

      .music-player-button:hover,
      .music-player-button:focus-visible,
      .music-player-button[aria-pressed="true"] {
        color: #ffffff;
        opacity: 1;
        outline: none;
      }

      .music-player-disc {
        position: relative;
        display: block;
        width: 30px;
        height: 30px;
        border: 1.2px solid currentColor;
        border-radius: 999px;
      }

      .music-player-disc::before {
        content: "";
        position: absolute;
        inset: 5px;
        border: 1px solid currentColor;
        border-radius: inherit;
        opacity: 0.34;
      }

      .music-player-ring {
        position: absolute;
        top: 6px;
        left: 50%;
        width: 1px;
        height: 6px;
        transform: translateX(-50%);
        border-radius: 999px;
        background: currentColor;
        opacity: 0.72;
      }

      .music-player-hole {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        transform: translate(-50%, -50%);
        border: 1.1px solid currentColor;
        border-radius: 999px;
        background: #050505;
      }

      .music-player-disc.is-playing {
        animation: musicDiscRotate 8s linear infinite;
      }

      @keyframes musicDiscRotate {
        to { transform: rotate(360deg); }
      }

      @media (prefers-reduced-motion: reduce) {
        .music-player-disc.is-playing {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function fadeAudio(nextVolume, onComplete) {
    if (!audio) return;
    if (fadeTimer) window.clearInterval(fadeTimer);

    const startVolume = audio.volume;
    const steps = Math.max(1, Math.round(fadeDurationMs / fadeStepMs));
    let step = 0;

    fadeTimer = window.setInterval(() => {
      step += 1;
      const progress = Math.min(1, step / steps);
      audio.volume = startVolume + (nextVolume - startVolume) * progress;

      if (progress >= 1) {
        window.clearInterval(fadeTimer);
        fadeTimer = 0;
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
    if (unlockListenersAttached || !wantsPlayback) return;

    unlockListenersAttached = true;
    window.addEventListener("pointerdown", handleUnlockPlayback, { once: true });
    window.addEventListener("keydown", handleUnlockPlayback, { once: true });
    window.addEventListener("wheel", handleUnlockPlayback, { once: true });
    window.addEventListener("touchstart", handleUnlockPlayback, { once: true });
  }

  function handleUnlockPlayback(event) {
    removeUnlockListeners();

    if (event.target instanceof Element && event.target.closest(".music-player-button")) {
      return;
    }

    if (wantsPlayback) {
      startPlayback();
    }
  }

  function startPlayback(fade = true) {
    const player = getAudio();

    player.volume = fade ? 0 : targetVolume;
    player.play().then(() => {
      if (fade) {
        fadeAudio(targetVolume);
      }
    }).catch(() => {
      isPlaying = false;
      updateButtons();
      addUnlockListeners();
    });
  }

  function updateButtons() {
    document.querySelectorAll(".music-player-button").forEach((button) => {
      button.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
      button.setAttribute("aria-pressed", String(isPlaying));
      button.querySelector(".music-player-disc")?.classList.toggle("is-playing", isPlaying);
    });
  }

  function getAudio() {
    if (audio) return audio;

    const savedState = readState();
    trackIndex = typeof savedState.trackIndex === "number" && playlist[savedState.trackIndex]
      ? savedState.trackIndex
      : 0;
    wantsPlayback = savedState.shouldPlay ?? true;

    audio = new Audio(playlist[trackIndex]);
    audio.preload = "metadata";
    audio.volume = 0;
    audio.addEventListener("loadedmetadata", () => {
      const nextTime = savedState.currentTime || 0;

      if (nextTime > 0 && Number.isFinite(nextTime) && nextTime < audio.duration) {
        audio.currentTime = nextTime;
      }
    }, { once: true });
    audio.addEventListener("play", () => {
      isPlaying = true;
      wantsPlayback = true;
      saveState();
      updateButtons();
    });
    audio.addEventListener("pause", () => {
      isPlaying = false;
      saveState();
      updateButtons();
    });
    audio.addEventListener("timeupdate", saveState);
    audio.addEventListener("ended", () => {
      trackIndex = (trackIndex + 1) % playlist.length;
      audio.src = playlist[trackIndex];
      audio.volume = 0;
      saveState();
      startPlayback(false);
    });

    return audio;
  }

  function togglePlayback() {
    const player = getAudio();

    if (isPlaying) {
      wantsPlayback = false;
      removeUnlockListeners();
      saveState();
      fadeAudio(0, () => player.pause());
      return;
    }

    wantsPlayback = true;
    saveState();
    startPlayback();
  }

  function createButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "music-player-button";
    button.setAttribute("aria-label", "Play background music");
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("data-no-transition", "true");
    button.innerHTML = '<span class="music-player-disc"><span class="music-player-ring"></span><span class="music-player-hole"></span></span>';
    button.addEventListener("click", togglePlayback);
    return button;
  }

  function mountPlayers() {
    const navs = document.querySelectorAll("header nav, .site-header .site-nav, .header .nav");

    navs.forEach((nav) => {
      const header = nav.closest("header");
      if (!header || header.querySelector(".music-player-button")) return;

      header.classList.add("has-music-player");
      nav.insertAdjacentElement("afterend", createButton());
    });
  }

  function init() {
    addStyles();
    mountPlayers();
    updateButtons();
    getAudio();

    if (wantsPlayback && audio.paused) {
      startPlayback();
    }

    window.addEventListener("beforeunload", saveState);
    document.addEventListener("visibilitychange", saveState);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
