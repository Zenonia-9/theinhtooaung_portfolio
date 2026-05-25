import { useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play, RotateCcw, X } from "lucide-react";

const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov"]);

function getMediaType(src = "") {
  const cleanSrc = src.split("?")[0].split("#")[0];
  const extension = cleanSrc.split(".").pop()?.toLowerCase();

  if (extension === "gif") return "gif";
  if (VIDEO_EXTENSIONS.has(extension)) return "video";
  return "gif";
}

function withCacheBust(src, key) {
  if (!key) return src;
  return `${src}${src.includes("?") ? "&" : "?"}restart=${key}`;
}

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) return "00:00";

  const totalSeconds = Math.floor(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
}

function VideoControls({
  currentTime,
  duration,
  fullscreen = false,
  isPlaying,
  onFullscreen,
  onPlayPause,
  onRestart,
  onSeek,
}) {
  return (
    <div
      className={[
        "flex w-full items-center",
        fullscreen
          ? "flex-nowrap gap-2 bg-black/85 px-2 py-2 text-white sm:gap-3 sm:px-5 sm:py-3"
          : "flex-wrap gap-3 border-t border-primary/15 bg-bg/90 p-3 text-text sm:p-4",
      ].join(" ")}
    >
      <button
        aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
        className="inline-flex h-9 w-9 shrink-0 cursor-hover items-center justify-center rounded-full border border-border bg-bg/80 hover:border-primary/40 hover:text-primary sm:h-10 sm:w-10"
        onClick={onPlayPause}
        type="button"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <button
        aria-label="Restart demo video"
        className="inline-flex h-9 w-9 shrink-0 cursor-hover items-center justify-center rounded-full border border-border bg-bg/80 hover:border-primary/40 hover:text-primary sm:h-10 sm:w-10"
        onClick={onRestart}
        type="button"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
      <input
        aria-label="Demo video progress"
        className="min-w-0 flex-1 cursor-pointer accent-primary"
        max={duration || 0}
        min="0"
        onChange={(event) => onSeek(Number(event.target.value))}
        step="0.01"
        type="range"
        value={duration ? currentTime : 0}
      />
      <span className="w-[5.8rem] shrink-0 whitespace-nowrap text-right font-mono text-[10px] text-muted sm:w-[6.75rem] sm:text-xs">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
      <button
        aria-label={fullscreen ? "Close fullscreen demo" : "Open fullscreen demo"}
        className="inline-flex h-9 w-9 shrink-0 cursor-hover items-center justify-center rounded-full border border-primary/35 bg-primary-soft text-primary hover:border-secondary/40 hover:text-secondary sm:h-10 sm:w-10"
        onClick={onFullscreen}
        type="button"
      >
        {fullscreen ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

function GifControls({ fullscreen = false, onClose, onFullscreen, onRestart }) {
  return (
    <div
      className={[
        "flex w-full items-center gap-3",
        fullscreen
          ? "justify-end bg-black/85 px-3 py-3 text-white sm:px-5"
          : "flex-wrap border-t border-primary/15 bg-bg/90 p-3 text-text sm:p-4",
      ].join(" ")}
    >
      <button
        className="inline-flex cursor-hover items-center gap-2 rounded-full border border-border bg-bg/80 px-4 py-2 text-sm font-semibold hover:border-primary/40 hover:text-primary"
        onClick={onRestart}
        type="button"
      >
        <RotateCcw className="h-4 w-4" />
        Restart
      </button>
      <button
        className="inline-flex cursor-hover items-center gap-2 rounded-full border border-primary/35 bg-primary-soft px-4 py-2 text-sm font-semibold text-primary hover:border-secondary/40 hover:text-secondary"
        onClick={fullscreen ? onClose : onFullscreen}
        type="button"
      >
        {fullscreen ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        {fullscreen ? "Close" : "Fullscreen"}
      </button>
    </div>
  );
}

function VideoPlayer({ fullscreen = false, onClose, onFullscreen, src }) {
  const videoRef = useRef(null);
  const hideTimerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const clearHideTimer = () => {
    if (!hideTimerRef.current) return;
    window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  };

  const revealControls = () => {
    setControlsVisible(true);

    if (!fullscreen || !isPlaying) return;

    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setControlsVisible(false);
      hideTimerRef.current = null;
    }, 3000);
  };

  const updateTiming = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime || 0);
    setDuration(video.duration || 0);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => setIsPlaying(false));
      return;
    }

    video.pause();
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    const shouldResume = !video.paused;
    video.currentTime = 0;
    setCurrentTime(0);
    if (shouldResume) video.play().catch(() => setIsPlaying(false));
  };

  const handleSeek = (value) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrentTime(value);
  };

  useEffect(() => {
    if (!fullscreen) {
      clearHideTimer();
      setControlsVisible(true);
      return undefined;
    }

    if (!isPlaying) {
      clearHideTimer();
      setControlsVisible(true);
      return undefined;
    }

    revealControls();

    const events = ["mousemove", "touchmove", "pointermove", "click", "keydown"];
    events.forEach((eventName) => window.addEventListener(eventName, revealControls, { passive: true }));

    return () => {
      clearHideTimer();
      events.forEach((eventName) => window.removeEventListener(eventName, revealControls));
    };
  }, [fullscreen, isPlaying]);

  return (
    <>
      <video
        aria-label="Project demo video"
        className={
          fullscreen
            ? "h-[100dvh] w-screen object-contain"
            : "max-h-[72dvh] w-full bg-black object-contain [@media(orientation:landscape)]:max-h-[86dvh]"
        }
        onDurationChange={updateTiming}
        onLoadedMetadata={updateTiming}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={updateTiming}
        playsInline
        preload="metadata"
        ref={videoRef}
        src={src}
      />
      <div
        className={
          fullscreen
            ? [
                "absolute inset-x-0 bottom-0 z-10 transition duration-300 ease-out",
                controlsVisible
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0",
              ].join(" ")
            : ""
        }
      >
        <VideoControls
          currentTime={currentTime}
          duration={duration}
          fullscreen={fullscreen}
          isPlaying={isPlaying}
          onFullscreen={fullscreen ? onClose : onFullscreen}
          onPlayPause={handlePlayPause}
          onRestart={handleRestart}
          onSeek={handleSeek}
        />
      </div>
    </>
  );
}

function GifPlayer({ fullscreen = false, onClose, onFullscreen, src }) {
  const [restartKey, setRestartKey] = useState(0);

  return (
    <>
      <img
        alt="Project demo animation"
        className={
          fullscreen
            ? "h-[100dvh] w-screen object-contain"
            : "max-h-[72dvh] w-full bg-black object-contain [@media(orientation:landscape)]:max-h-[86dvh]"
        }
        key={restartKey}
        src={withCacheBust(src, restartKey)}
      />
      <div className={fullscreen ? "absolute inset-x-0 bottom-0 z-10" : ""}>
        <GifControls
          fullscreen={fullscreen}
          onClose={onClose}
          onFullscreen={onFullscreen}
          onRestart={() => setRestartKey((value) => value + 1)}
        />
      </div>
    </>
  );
}

function FullscreenDemo({ mediaType, onClose, src }) {
  useScrollLock(true);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] h-[100dvh] w-screen bg-black" onClick={onClose}>
      <div className="relative h-full w-full" onClick={(event) => event.stopPropagation()}>
        {mediaType === "video" ? (
          <VideoPlayer fullscreen onClose={onClose} src={src} />
        ) : (
          <GifPlayer fullscreen onClose={onClose} src={src} />
        )}
      </div>
    </div>
  );
}

export default function GifViewer({ src }) {
  const [fullscreen, setFullscreen] = useState(false);
  const mediaType = getMediaType(src);

  if (!src) return null;

  return (
    <>
      <div className="surface-card overflow-hidden p-3 sm:p-4">
        <div className="overflow-hidden rounded-[1.25rem] border border-primary/20 bg-black">
          {mediaType === "video" ? (
            <VideoPlayer onFullscreen={() => setFullscreen(true)} src={src} />
          ) : (
            <GifPlayer onFullscreen={() => setFullscreen(true)} src={src} />
          )}
        </div>
      </div>

      {fullscreen ? (
        <FullscreenDemo
          mediaType={mediaType}
          onClose={() => setFullscreen(false)}
          src={src}
        />
      ) : null}
    </>
  );
}
