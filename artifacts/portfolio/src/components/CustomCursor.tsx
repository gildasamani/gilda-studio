import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const isHoveringRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const springDot = { stiffness: 900, damping: 35, mass: 0.3 };
  const springRing = { stiffness: 160, damping: 22, mass: 0.8 };

  const dotSpringX = useSpring(cursorX, springDot);
  const dotSpringY = useSpring(cursorY, springDot);
  const ringSpringX = useSpring(ringX, springRing);
  const ringSpringY = useSpring(ringY, springRing);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);

      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (dotRef.current) dotRef.current.classList.add("cursor-idle");
        if (ringRef.current) ringRef.current.classList.add("cursor-idle");
      }, 3000);
      if (dotRef.current) dotRef.current.classList.remove("cursor-idle");
      if (ringRef.current) ringRef.current.classList.remove("cursor-idle");
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.cursor === "hover";

      isHoveringRef.current = !!isInteractive;

      if (dotRef.current) {
        dotRef.current.style.transform = `scale(${isInteractive ? 0.4 : 1})`;
        dotRef.current.style.opacity = isInteractive ? "0.5" : "1";
      }
      if (ringRef.current) {
        ringRef.current.style.borderColor = isInteractive
          ? "rgba(183,123,87,0.8)"
          : "rgba(183,123,87,0.45)";
        ringRef.current.style.boxShadow = isInteractive
          ? "0 0 18px 3px rgba(183,123,87,0.25)"
          : "0 0 10px 2px rgba(183,123,87,0.12)";
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[200] transition-transform duration-200"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          backgroundColor: "rgba(183,123,87,1)",
          boxShadow: "0 0 8px 2px rgba(183,123,87,0.5)",
          opacity: 0,
        }}
      />
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[200] transition-colors duration-300 transition-shadow duration-300"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          border: "1.5px solid rgba(183,123,87,0.45)",
          boxShadow: "0 0 10px 2px rgba(183,123,87,0.12)",
          opacity: 0,
        }}
      />
      <style>{`
        @keyframes cursorPulse {
          0%, 100% { box-shadow: 0 0 10px 2px rgba(183,123,87,0.12); }
          50% { box-shadow: 0 0 22px 6px rgba(183,123,87,0.28); }
        }
        .cursor-idle { animation: cursorPulse 2.5s ease-in-out infinite !important; }
        * { cursor: none !important; }
      `}</style>
    </>
  );
}
