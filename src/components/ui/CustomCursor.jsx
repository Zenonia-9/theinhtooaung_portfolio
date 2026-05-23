import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const stateRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    active: false,
  });

  useEffect(() => {
    if (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const selectors = "a, button, .cursor-hover, .project-card";
    let frameId = 0;

    const move = (event) => {
      stateRef.current.targetX = event.clientX;
      stateRef.current.targetY = event.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${event.clientX - 4}px, ${event.clientY - 4}px)`;
      }
    };

    const setActive = (active) => {
      stateRef.current.active = active;
      ringRef.current?.classList.toggle("scale-150", active);
      ringRef.current?.classList.toggle("border-secondary", active);
      dotRef.current?.classList.toggle("scale-125", active);
    };

    const animate = () => {
      const state = stateRef.current;
      state.currentX += (state.targetX - state.currentX) * 0.16;
      state.currentY += (state.targetY - state.currentY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${state.currentX - 18}px, ${state.currentY - 18}px)`;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const onPointerOver = (event) => {
      if (event.target instanceof Element && event.target.closest(selectors)) {
        setActive(true);
      }
    };

    const onPointerOut = (event) => {
      if (event.target instanceof Element && event.target.closest(selectors)) {
        setActive(false);
      }
    };

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 rounded-full bg-primary md:block"
        ref={dotRef}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-9 w-9 rounded-full border border-secondary/80 bg-transparent transition-transform duration-200 md:block"
        ref={ringRef}
      />
    </>
  );
}
