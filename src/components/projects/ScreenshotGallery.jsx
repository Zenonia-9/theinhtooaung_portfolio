import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, RotateCcw, X } from "lucide-react";

function MediaModal({ items, activeIndex, onClose, onIndexChange }) {
  const touchStartX = useRef(null);
  const activeItem = items[activeIndex];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onIndexChange(Math.max(0, activeIndex - 1));
      if (event.key === "ArrowRight") onIndexChange(Math.min(items.length - 1, activeIndex + 1));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length, onClose, onIndexChange]);

  const goPrevious = () => onIndexChange(Math.max(0, activeIndex - 1));
  const goNext = () => onIndexChange(Math.min(items.length - 1, activeIndex + 1));

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/92 p-3 sm:p-5"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex h-[90vh] w-[95vw] max-w-[1400px] flex-col justify-center"
        exit={{ opacity: 0, scale: 0.98 }}
        initial={{ opacity: 0, scale: 0.98 }}
        onClick={(event) => event.stopPropagation()}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const delta = touchStartX.current - event.changedTouches[0].clientX;
          if (delta > 50) goNext();
          if (delta < -50) goPrevious();
          touchStartX.current = null;
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <button
          aria-label="Close media viewer"
          className="absolute right-0 top-0 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur hover:border-secondary/45 hover:text-secondary"
          onClick={onClose}
          type="button"
        >
          <X className="h-5 w-5" />
        </button>

        {items.length > 1 ? (
          <>
            <button
              aria-label="Previous screenshot"
              className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur hover:border-secondary/45 hover:text-secondary sm:inline-flex"
              disabled={activeIndex === 0}
              onClick={goPrevious}
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next screenshot"
              className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur hover:border-secondary/45 hover:text-secondary sm:inline-flex"
              disabled={activeIndex === items.length - 1}
              onClick={goNext}
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        <div className="flex min-h-0 flex-1 items-center justify-center pt-14">
          <img
            alt={activeItem.title}
            className="max-h-[78vh] w-auto max-w-full rounded-[1.25rem] object-contain [@media(orientation:landscape)]:max-h-[86vh] [@media(orientation:landscape)]:max-w-[100vw]"
            src={activeItem.src}
          />
        </div>

        <div className="mx-auto mt-4 max-w-4xl text-center">
          <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">
            {activeItem.title}
          </h3>
          {activeItem.description ? (
            <p className="mt-2 text-sm leading-7 text-white/70">{activeItem.description}</p>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function GifViewer({ src, title, description }) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const item = useMemo(() => [{ src, title, description }], [description, src, title]);

  if (!src) return null;

  return (
    <>
      <div className="surface-card overflow-hidden p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-primary/20 bg-bg/80">
          {playing ? (
            <img
              alt={title}
              className="max-h-[72vh] w-full object-contain"
              key={reloadKey}
              src={src}
            />
          ) : (
            <div className="flex aspect-video min-h-48 items-center justify-center text-sm font-semibold text-muted">
              Paused
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="inline-flex cursor-hover items-center gap-2 rounded-full border border-border bg-bg/80 px-4 py-2 text-sm font-semibold text-text hover:border-primary/40 hover:text-primary"
            onClick={() => setPlaying((value) => !value)}
            type="button"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            className="inline-flex cursor-hover items-center gap-2 rounded-full border border-border bg-bg/80 px-4 py-2 text-sm font-semibold text-text hover:border-primary/40 hover:text-primary"
            onClick={() => {
              setPlaying(true);
              setReloadKey((value) => value + 1);
            }}
            type="button"
          >
            <RotateCcw className="h-4 w-4" />
            Replay
          </button>
          <button
            className="inline-flex cursor-hover items-center gap-2 rounded-full border border-primary/35 bg-primary-soft px-4 py-2 text-sm font-semibold text-primary hover:border-secondary/40 hover:text-secondary"
            onClick={() => setOpen(true)}
            type="button"
          >
            <Maximize2 className="h-4 w-4" />
            Fullscreen
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <MediaModal
            activeIndex={0}
            items={item}
            onClose={() => setOpen(false)}
            onIndexChange={() => {}}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default function ScreenshotGallery({ screenshots = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!screenshots.length) {
    return null;
  }

  return (
    <>
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {screenshots.map((shot, index) => (
          <button
            className="project-card cursor-hover surface-card w-[85vw] shrink-0 snap-center overflow-hidden p-0 text-left md:w-auto"
            key={shot.src}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <img
              alt={shot.title}
              className="aspect-video w-full bg-bg/80 object-contain"
              src={shot.src}
            />
            <div className="p-5">
              <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-text">
                {shot.title}
              </h3>
              {shot.description ? (
                <p className="mt-2 text-sm leading-7 text-muted">{shot.description}</p>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <MediaModal
            activeIndex={activeIndex}
            items={screenshots}
            onClose={() => setActiveIndex(null)}
            onIndexChange={setActiveIndex}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
