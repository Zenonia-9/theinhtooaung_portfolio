import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function ScreenshotGallery({ screenshots = [] }) {
  const [activeShot, setActiveShot] = useState(null);

  useEffect(() => {
    if (!activeShot) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveShot(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeShot]);

  if (!screenshots.length) {
    return null;
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {screenshots.map((shot) => (
          <button
            className="project-card cursor-hover surface-card overflow-hidden p-0 text-left"
            key={shot.src}
            onClick={() => setActiveShot(shot)}
            type="button"
          >
            <img alt={shot.title} className="h-64 w-full object-cover" src={shot.src} />
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
        {activeShot ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/82 p-4 backdrop-blur-md"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setActiveShot(null)}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-5xl rounded-[2rem] border border-primary/35 bg-bg-elevated p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
              exit={{ opacity: 0, scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <button
                aria-label="Close screenshot modal"
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/80 text-text hover:border-secondary/45 hover:text-secondary"
                onClick={() => setActiveShot(null)}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                alt={activeShot.title}
                className="max-h-[72vh] w-full rounded-[1.5rem] object-contain"
                src={activeShot.src}
              />
              <div className="px-2 pb-2 pt-5">
                <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-text">
                  {activeShot.title}
                </h3>
                {activeShot.description ? (
                  <p className="mt-3 text-sm leading-7 text-muted">{activeShot.description}</p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
