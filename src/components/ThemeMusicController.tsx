import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Moon, Sun, SkipForward, Play, Pause } from "lucide-react";

// ─── Drop MP3s into public/audio/ and list them here ───
const lightTracks = [
  "/audio/classical-theme.mp3",
  // "/audio/romantic-piano.mp3",
];

const darkTracks = [
  "/audio/tron-theme.mp3",
  // "/audio/synthwave-cruise.mp3",
];

// Optional DJ scratch sound effect (place in public/audio/)
const SCRATCH_SRC = "/audio/dj-scratch.mp3";

interface ThemeMusicControllerProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function ThemeMusicController({
  isDark,
  setIsDark,
}: ThemeMusicControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showVolume, setShowVolume] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [spotlightActive, setSpotlightActive] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scratchRef = useRef<HTMLAudioElement | null>(null);
  const spotlightAudioRef = useRef<HTMLAudioElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const savedTimeRef = useRef(0);
  const savedSrcRef = useRef("");
  const spotlightActiveRef = useRef(false);
  const spotlightEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tracks = isDark ? darkTracks : lightTracks;

  // Keep trackIndex in bounds when switching themes
  useEffect(() => {
    setTrackIndex(0);
  }, [isDark]);

  // Sync volume to audio elements
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    if (spotlightAudioRef.current) spotlightAudioRef.current.volume = volume;
  }, [volume]);

  // Track whether we are resuming from a spotlight
  const resumingRef = useRef(false);

  // Update audio source and play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || spotlightActive) return;

    // When resuming after a spotlight, skip the src assignment —
    // handleSpotlightEnd already restored src + currentTime.
    if (resumingRef.current) {
      resumingRef.current = false;
      return;
    }

    const src = tracks[trackIndex] ?? tracks[0];
    if (audio.src !== new URL(src, window.location.origin).href) {
      audio.src = src;
    }

    if (isPlaying) {
      audio
        .play()
        .catch((e: Error) => console.warn("Autoplay blocked:", e.message));
    }
  }, [isDark, isPlaying, trackIndex, tracks, spotlightActive]);

  const handleEnded = useCallback(() => {
    if (tracks.length > 1) {
      setTrackIndex((i) => (i + 1) % tracks.length);
    }
  }, [tracks]);

  // ─── Party Spotlight: DJ scratch + theme song ───
  useEffect(() => {
    const handleSpotlight = (e: Event) => {
      const { song } = (e as CustomEvent).detail;
      const audio = audioRef.current;
      if (!audio) return;

      // Cancel any pending spotlight-end (user moved between cards)
      if (spotlightEndTimer.current) {
        clearTimeout(spotlightEndTimer.current);
        spotlightEndTimer.current = null;
      }

      // If already in spotlight mode (moving between party cards),
      // just swap the theme song — don't re-scratch or re-pause.
      if (spotlightActiveRef.current) {
        const spotlight = spotlightAudioRef.current;
        if (spotlight) {
          spotlight.pause();
          if (song) {
            spotlight.src = song;
            spotlight.volume = volume;
            spotlight.play().catch(() => {});
          }
        }
        return;
      }

      savedTimeRef.current = audio.currentTime;
      savedSrcRef.current = audio.src;
      audio.pause();
      spotlightActiveRef.current = true;
      setSpotlightActive(true);

      // Play scratch sound effect
      const scratch = scratchRef.current;
      if (scratch && scratch.readyState >= 2) {
        scratch.currentTime = 0;
        scratch.volume = Math.min(volume * 1.2, 1);
        scratch.play().catch(() => {});
      }

      // After scratch, play the member's theme song (if they have one)
      if (song) {
        setTimeout(() => {
          const spotlight = spotlightAudioRef.current;
          if (!spotlight) return;
          spotlight.src = song;
          spotlight.volume = volume;
          spotlight.play().catch(() => {});
        }, 300);
      }
    };

    const handleSpotlightEnd = () => {
      // Debounce: wait briefly so moving between cards doesn't
      // reset spotlight and re-trigger the scratch.
      spotlightEndTimer.current = setTimeout(() => {
        spotlightEndTimer.current = null;
        const spotlight = spotlightAudioRef.current;
        const audio = audioRef.current;
        if (spotlight) {
          spotlight.pause();
          spotlight.src = "";
        }
        // Mark that we're resuming so the src-sync effect doesn't clobber position
        resumingRef.current = true;
        spotlightActiveRef.current = false;
        setSpotlightActive(false);

        if (audio && isPlaying) {
          if (savedSrcRef.current && audio.src !== savedSrcRef.current) {
            audio.src = savedSrcRef.current;
            audio.addEventListener("loadeddata", function onLoad() {
              audio.removeEventListener("loadeddata", onLoad);
              audio.currentTime = savedTimeRef.current;
              audio.play().catch(() => {});
            });
          } else {
            audio.currentTime = savedTimeRef.current;
            audio.play().catch(() => {});
          }
        }
      }, 150);
    };

    window.addEventListener("party-spotlight", handleSpotlight);
    window.addEventListener("party-spotlight-end", handleSpotlightEnd);
    return () => {
      window.removeEventListener("party-spotlight", handleSpotlight);
      window.removeEventListener("party-spotlight-end", handleSpotlightEnd);
    };
  }, [isPlaying, volume]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .catch((e: Error) => console.warn("Playback failed:", e.message));
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = () => {
    setTrackIndex((i) => (i + 1) % tracks.length);
  };

  const btnBase = "p-3 rounded-full transition-all duration-300 cursor-pointer";
  const btnLight = "bg-cream text-dusty-blue hover:bg-sage/20 shadow-md";
  const btnDark =
    "bg-tron-grid text-tron-blue hover:bg-tron-dark shadow-[0_0_15px_rgba(102,252,241,0.4)]";

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        showVolume &&
        controlsRef.current &&
        !controlsRef.current.contains(event.target as Node)
      ) {
        setShowVolume(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showVolume]);

  return (
    <div
      ref={controlsRef}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl border px-2 py-2 backdrop-blur ${
        isDark
          ? "border-tron-blue/30 bg-tron-dark/85"
          : "border-sage/25 bg-cream/90 shadow-lg"
      }`}
    >
      {/* Hidden audio elements */}
      <audio ref={audioRef} loop={tracks.length <= 1} onEnded={handleEnded} />
      <audio ref={scratchRef} src={SCRATCH_SRC} preload="auto" />
      <audio ref={spotlightAudioRef} />

      <button
        onClick={toggleMusic}
        className={`${btnBase} ${isDark ? btnDark : btnLight}`}
        aria-label={
          isPlaying ? "Pause background music" : "Play background music"
        }
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      <button
        onClick={() => setShowVolume((prev) => !prev)}
        className={`${btnBase} ${isDark ? btnDark : btnLight}`}
        aria-label={showVolume ? "Hide volume slider" : "Show volume slider"}
      >
        {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {showVolume && (
        <div
          className={`flex items-center rounded-xl px-3 py-2 ${
            isDark
              ? "bg-tron-grid/80 border border-tron-blue/20"
              : "bg-white/80 border border-sage/25"
          }`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider w-24 sm:w-32"
            aria-label="Volume"
          />
        </div>
      )}

      {tracks.length > 1 && (
        <button
          onClick={skipTrack}
          className={`${btnBase} ${isDark ? btnDark : btnLight}`}
          aria-label="Skip to next track"
        >
          <SkipForward size={20} />
        </button>
      )}

      <button
        onClick={() => setIsDark(!isDark)}
        className={`${btnBase} ${isDark ? btnDark : btnLight}`}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
