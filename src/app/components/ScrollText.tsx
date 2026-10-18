"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export interface Segment {
  text: string;
  className?: string;
}

type Part = { text: string; at?: number };

/** Splits the segments into words (numbered in reading order) and the spaces between them. */
function split(segments: Segment[]) {
  let words = 0;
  const lines = segments.map(({ text, className }) => ({
    className,
    parts: text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((part): Part => (part.trim() ? { text: part, at: words++ } : { text: part })),
  }));
  return { lines, words };
}

function Word({ text, progress, range }: { text: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{text}</motion.span>;
}

/**
 * A paragraph that lights up word by word as it scrolls up the screen, so the
 * eye follows the sentence. It is fully lit by the time it is mid-screen.
 */
export default function ScrollText({ segments, className }: { segments: Segment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const { lines, words } = split(segments);

  return (
    <p ref={ref} className={className}>
      {lines.map((line, l) => (
        <span key={l} className={line.className}>
          {line.parts.map((part, i) =>
            part.at === undefined ? (
              part.text
            ) : (
              <Word
                key={i}
                text={part.text}
                progress={scrollYProgress}
                range={[part.at / words, (part.at + 1) / words]}
              />
            ),
          )}
        </span>
      ))}
    </p>
  );
}
