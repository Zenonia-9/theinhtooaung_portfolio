import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function MobileMenu({ links, pathname }) {
  const [open, setOpen] = useState(false);
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card/75 text-text shadow-soft backdrop-blur"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-x-4 top-[5.25rem] z-50 rounded-[1.75rem] border border-border bg-bg-elevated/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            exit={{ opacity: 0, y: -16 }}
            initial={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const active =
                  link.href === "/"
                    ? normalizedPath === "/"
                    : normalizedPath.startsWith(link.href);
                return (
                  <a
                    className={`rounded-2xl border px-4 py-3 text-base font-medium ${
                      active
                        ? "border-primary/30 bg-primary-soft text-primary"
                        : "border-border bg-card/70 text-text hover:border-secondary/35 hover:text-secondary"
                    }`}
                    href={link.href}
                    key={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
