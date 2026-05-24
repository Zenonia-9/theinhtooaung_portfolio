import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ringInnerRef = useRef(null);

  const stateRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    initialized: false,
    active: false,
  });

  useEffect(() => {
    if (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const selectors = "a, button, .cursor-hover, .project-card";
    let frameId = 0;

    const showCursor = () => {
      dotRef.current?.classList.remove("opacity-0");
      ringRef.current?.classList.remove("opacity-0");
    };

    const hideCursor = () => {
      dotRef.current?.classList.add("opacity-0");
      ringRef.current?.classList.add("opacity-0");
    };

    const setActive = (active) => {
      if (stateRef.current.active === active) {
        return;
      }

      stateRef.current.active = active;

      if (ringInnerRef.current) {
        ringInnerRef.current.style.transform = active ? "scale(1.6)" : "scale(1)";
        ringInnerRef.current.style.borderWidth = active ? "2px" : "1px";
        ringInnerRef.current.style.backgroundColor = active
          ? "rgb(var(--primary) / 0.12)"
          : "rgb(var(--primary) / 0.05)";
      }
    };

    const move = (event) => {
      const state = stateRef.current;

      state.targetX = event.clientX;
      state.targetY = event.clientY;

      if (!state.initialized) {
        state.currentX = event.clientX;
        state.currentY = event.clientY;
        state.initialized = true;
      }

      showCursor();

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 4}px, 0)`;
      }

      const isClickable =
        event.target instanceof Element && Boolean(event.target.closest(selectors));

      setActive(isClickable);
    };

    const animate = () => {
      const state = stateRef.current;

      if (state.initialized) {
        const dx = state.targetX - state.currentX;
        const dy = state.targetY - state.currentY;
        const distance = Math.hypot(dx, dy);

        if (distance > 6000) {
          state.currentX += dx * (distance / 14000);
          state.currentY += dy * (distance / 14000);
          // state.currentX = state.targetX;
          // state.currentY = state.targetY;
        } else {
          state.currentX += dx * 0.2;
          state.currentY += dy * 0.2;
        }

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${state.currentX - 16}px, ${state.currentY - 16}px, 0)`;
        }
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const onPointerDown = (event) => {
      move(event);
      setActive(true);
    };

    const onPointerUp = (event) => {
      move(event);

      const target = document.elementFromPoint(event.clientX, event.clientY);
      const isClickable = target instanceof Element && Boolean(target.closest(selectors));

      setActive(isClickable);
    };

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    frameId = window.requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden h-2 w-2 rounded-full bg-primary opacity-0 md:block"
        ref={dotRef}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99998] hidden h-8 w-8 opacity-0 md:block"
        ref={ringRef}
      >
        <span
          aria-hidden="true"
          className="block h-full w-full rounded-full border border-secondary/80 bg-primary/5 shadow-[0_0_24px_rgba(190,103,255,0.45)] transition-[transform,border-color,background-color,border-width] duration-300 ease-out"
          ref={ringInnerRef}
        />
      </span>
    </>
  );
}