"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], label, input, select, textarea, summary";

/**
 * A soft ring that trails the mouse and swells over anything clickable. The
 * real cursor stays visible; touch screens and reduced motion never see it.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.45 });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine);
    if (!fine) return;

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const over = (event: PointerEvent) => setHovering(!!(event.target as Element | null)?.closest?.(INTERACTIVE));
    const hide = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-[80]" style={{ x: sx, y: sy }}>
      <motion.div
        className="-mt-4 -ml-4 size-8 rounded-full border border-accent/60"
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.75 : hovering ? 1.6 : 1,
          backgroundColor: hovering ? "var(--accent-soft)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
    </motion.div>
  );
}
