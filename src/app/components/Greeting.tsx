"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { EASE } from "./motion";
import { greetings } from "../data/portfolio";

function greetingsFor(date: Date) {
  const minutes = date.getHours() * 60 + date.getMinutes();
  if (minutes >= 301 && minutes <= 660) return greetings.morning;
  if (minutes >= 661 && minutes <= 960) return greetings.afternoon;
  if (minutes >= 961 && minutes <= 1140) return greetings.evening;
  return greetings.night;
}

/** "Good afternoon!" → "こんにちは" → "Bonjour!"… a greeting that softly rolls through languages. */
export default function Greeting({ className = "" }: { className?: string }) {
  const [list, setList] = useState<string[]>(["Hello!"]);
  const [index, setIndex] = useState(0);

  // The visitor's local time is only known in the browser.
  useEffect(() => {
    setList(greetingsFor(new Date()));
    setIndex(0);
  }, []);

  useEffect(() => {
    if (list.length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % list.length), 2800);
    return () => window.clearInterval(timer);
  }, [list]);

  const text = list[index % list.length];

  return (
    <p className={`relative h-[1.35em] overflow-hidden ${className}`}>
      <span className="sr-only">{list[0]}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={text}
          aria-hidden
          className="absolute inset-x-0 top-0 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
