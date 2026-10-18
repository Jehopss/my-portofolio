"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { expertise } from "../data/portfolio";

/** Keeps `v` inside [min, max), wrapping around like a loop. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Drift in % of the track per second when the page is still. */
const BASE_SPEED = 1.6;

/**
 * An endless ribbon of focus areas. It drifts on its own, follows the
 * direction you scroll, speeds up and leans with the scroll's speed, and
 * slows right down while the pointer rests on it.
 */
export default function Marquee() {
  const items = expertise.map((area) => area.name);
  // Two identical halves: the track slides exactly one half, then loops seamlessly.
  const row = [...items, ...items];

  const reduceMotion = useReducedMotion();
  const offset = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7]);
  const x = useTransform(offset, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(-1);
  const hovered = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    if (boost.get() < 0) direction.current = 1;
    else if (boost.get() > 0) direction.current = -1;
    let step = direction.current * BASE_SPEED * (delta / 1000);
    step += step * Math.abs(boost.get());
    if (hovered.current) step *= 0.15;
    offset.set(offset.get() + step);
  });

  return (
    <div
      aria-hidden
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
      className="relative overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:py-6"
    >
      <motion.div className="flex w-max" style={{ x, skewX: reduceMotion ? 0 : skew }}>
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 pr-8 text-2xl font-light tracking-[-0.02em] whitespace-nowrap text-muted transition-colors duration-300 hover:text-fg md:gap-10 md:pr-10 md:text-[2rem]"
          >
            {item}
            <span className="size-1.5 rounded-full bg-accent/70" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
