import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "theme";

function applyTheme(nextTheme) {
  const root = document.documentElement;
  const isDark = nextTheme !== "light";
  root.classList.toggle("dark", isDark);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const isDark = theme !== "light";

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card/75 text-text shadow-soft backdrop-blur hover:border-primary/40 hover:text-primary focus-visible:ring-0"
      onClick={toggleTheme}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          className="relative inline-flex items-center justify-center"
          exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
          initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-primary" strokeWidth={2.2} />
          ) : (
            <Sun className="h-4 w-4 text-secondary" strokeWidth={2.2} />
          )}
        </motion.span>
      </AnimatePresence>
      <span className="absolute inset-0 rounded-2xl ring-0 transition group-hover:ring-2 group-hover:ring-secondary/25" />
    </button>
  );
}
