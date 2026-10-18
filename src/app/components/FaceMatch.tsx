"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";

import { EASE } from "./motion";

/**
 * Where the face sits in profile.webp, as percentages of the photo. The card
 * keeps the photo's own 4:5 ratio, so these hold at every size. Update them if
 * the photo changes.
 */
const FACE = { left: 25, top: 16.5, width: 49.5, height: 49 };
const SCORE = 98.7;
/** The photo has a white backdrop in both themes, so the box keeps one colour. */
const INK = "#0b7c86";

const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2 rounded-tl-[3px]",
  "right-0 top-0 border-r-2 border-t-2 rounded-tr-[3px]",
  "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[3px]",
  "bottom-0 right-0 border-b-2 border-r-2 rounded-br-[3px]",
];

/**
 * A face-match box over the portrait: it closes in on the face while a scan
 * line sweeps, locks, then counts the match score up. Remount it (new `key`)
 * to run the scan again.
 */
export default function FaceMatch({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!locked) return;
    if (reduce) {
      setScore(SCORE);
      return;
    }
    const controls = animate(0, SCORE, { duration: 1.1, ease: EASE, onUpdate: setScore });
    return () => controls.stop();
  }, [locked, reduce]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-10"
      style={{
        left: `${FACE.left}%`,
        top: `${FACE.top}%`,
        width: `${FACE.width}%`,
        height: `${FACE.height}%`,
        color: INK,
      }}
      initial={reduce ? false : { opacity: 0, scale: 1.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      onAnimationComplete={() => setLocked(true)}
    >
      <span className="absolute inset-0 rounded-[3px] border border-current opacity-40" />
      {CORNERS.map((corner) => (
        <span key={corner} className={`absolute size-4 border-current ${corner}`} />
      ))}

      {!reduce && (
        <motion.span
          className="absolute inset-x-1 h-[2px] rounded-full bg-current shadow-[0_0_12px_currentColor]"
          initial={{ top: "0%", opacity: 0 }}
          animate={{ top: ["4%", "96%", "40%"], opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.3, ease: "easeInOut", delay: delay + 0.15 }}
        />
      )}

      <motion.span
        className="absolute bottom-full left-[-1px] mb-1.5 flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.7rem] leading-none font-medium whitespace-nowrap text-white shadow-sm"
        style={{ background: INK }}
        initial={reduce ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: delay + 0.5 }}
      >
        {locked ? (
          <>
            Jonathan <span className="tabular-nums opacity-80">{score.toFixed(1)}% match</span>
          </>
        ) : (
          "Scanning…"
        )}
      </motion.span>
    </motion.div>
  );
}
