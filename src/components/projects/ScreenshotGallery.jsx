import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}

function MediaModal({ items, activeIndex, onClose, onIndexChange }) {
  const touchStartX = useRef(null);
  const activeItem = items[activeIndex];
  const hasMultipleItems = items.length > 1;

  useScrollLock(true);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasMultipleItems) {
        onIndexChange(Math.max(0, activeIndex - 1));
      }
      if (event.key === "ArrowRight" && hasMultipleItems) {
        onIndexChange(Math.min(items.length - 1, activeIndex + 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, hasMultipleItems, items.length, onClose, onIndexChange]);

  const goPrevious = () => onIndexChange(Math.max(0, activeIndex - 1));
  const goNext = () => onIndexChange(Math.min(items.length - 1, activeIndex + 1));

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen flex-col bg-black/[0.94] px-3 py-3 sm:px-5 sm:py-4"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex shrink-0 justify-end">
        <button
          aria-label="Close media viewer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur hover:border-secondary/45 hover:text-secondary"
          onClick={onClose}
          type="button"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-0 flex-1 flex-col"
        exit={{ opacity: 0, scale: 0.98 }}
        initial={{ opacity: 0, scale: 0.98 }}
        onTouchEnd={(event) => {
          if (!hasMultipleItems || touchStartX.current === null) return;
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
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div onClick={(event) => event.stopPropagation()}>
            <img
              alt={activeItem.title}
              className="max-h-[70dvh] max-w-[96vw] rounded-[1rem] object-contain [@media(orientation:landscape)]:max-h-[86dvh]"
              src={activeItem.src}
            />
          </div>
        </div>

        <div
          className="mx-auto mt-3 flex w-full max-w-5xl shrink-0 flex-col gap-3 text-center text-white sm:mt-4"
          onClick={(event) => event.stopPropagation()}
        >
          {hasMultipleItems ? (
            <div className="flex items-center justify-center gap-3">
              <button
                aria-label="Previous screenshot"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur disabled:cursor-not-allowed disabled:opacity-40 hover:border-secondary/45 hover:text-secondary"
                disabled={activeIndex === 0}
                onClick={goPrevious}
                type="button"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="font-mono text-xs text-white/70">
                {activeIndex + 1} / {items.length}
              </span>
              <button
                aria-label="Next screenshot"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur disabled:cursor-not-allowed disabled:opacity-40 hover:border-secondary/45 hover:text-secondary"
                disabled={activeIndex === items.length - 1}
                onClick={goNext}
                type="button"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}

          <div>
            <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-white sm:text-xl">
              {activeItem.title}
            </h3>
            {activeItem.description ? (
              <p className="mx-auto mt-1 max-w-3xl text-sm leading-6 text-white/70">
                {activeItem.description}
              </p>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
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
