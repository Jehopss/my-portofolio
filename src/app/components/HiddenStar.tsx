"use client";

import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkle } from "lucide-react";

import { burst } from "./confetti";
import { EASE } from "./motion";
import { useQuest } from "./QuestProvider";

const GOLD = ["#e0b44c", "#f1d38a", "#c8962c"];

/**
 * A small twinkling star tucked into the page. Clicking it collects it (with a
 * little golden burst); find all of them for the Stargazer quest. Collected
 * stars stay gone on later visits.
 */
export default function HiddenStar({ id, className = "" }: { id: string; className?: string }) {
  const { ready, progress, findStar } = useQuest();
  const visible = ready && !progress.stars.includes(id);

  const collect = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, { count: 22, power: 5, colors: GOLD });
    findStar(id);
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.button
          key="star"
          type="button"
          onClick={collect}
          aria-label="A hidden star. Collect it."
          title="A hidden star"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 2, opacity: 0, rotate: 90, transition: { duration: 0.45, ease: EASE } }}
          transition={{ duration: 0.6, ease: EASE }}
          className={`inline-grid size-7 cursor-pointer place-items-center rounded-full align-middle text-[#c8962c] transition-colors hover:bg-[#e0b44c]/15 dark:text-[#e0b44c] ${className}`}
        >
          <Sparkle aria-hidden className="star-twinkle size-3.5" strokeWidth={2} fill="currentColor" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
