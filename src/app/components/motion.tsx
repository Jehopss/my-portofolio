"use client";

import { Children, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/** Soft "expo out" curve used for almost every entrance on the site. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

export const stagger = (step = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Fades + lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A list whose items cascade in one after another. */
export function StaggerList({
  children,
  className,
  itemClassName,
  step = 0.05,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  step?: number;
  amount?: number;
}) {
  return (
    <motion.ul
      className={className}
      variants={stagger(step)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {Children.map(children, (child) => (
        <motion.li variants={fadeUp} className={itemClassName}>
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}
