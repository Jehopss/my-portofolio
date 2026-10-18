"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useScroll } from "framer-motion";

/**
 * The section's number, with a short line beside it that fills as the visitor
 * reads through the section: empty when its top reaches the middle of the
 * screen, full when its bottom does.
 */
export default function SectionMeter({ id, index }: { id: string; index: string }) {
  const { scrollY } = useScroll();
  const read = useMotionValue(0);

  useEffect(() => {
    const section = document.getElementById(id);
    if (!section) return;
    let top = 0;
    let height = 1;

    const update = () => {
      const share = (scrollY.get() + window.innerHeight / 2 - top) / height;
      read.set(Math.min(1, Math.max(0, share)));
    };
    const measure = () => {
      top = section.getBoundingClientRect().top + window.scrollY;
      height = section.offsetHeight;
      update();
    };

    measure();
    // Filters change the section's height, so measure again whenever it resizes.
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    window.addEventListener("resize", measure);
    const stop = scrollY.on("change", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      stop();
    };
  }, [id, scrollY, read]);

  return (
    <p className="flex items-center gap-3 text-sm font-medium text-accent tabular-nums">
      {index}
      <span aria-hidden className="relative h-px w-14 overflow-hidden bg-line">
        <motion.span style={{ scaleX: read }} className="absolute inset-0 origin-left bg-accent" />
      </span>
    </p>
  );
}
