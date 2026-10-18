"use client";

import { useEffect, useState } from "react";

import { greetings } from "../data/portfolio";

function greetingsFor(date: Date) {
  const minutes = date.getHours() * 60 + date.getMinutes();
  if (minutes >= 301 && minutes <= 660) return greetings.morning;
  if (minutes >= 661 && minutes <= 960) return greetings.afternoon;
  if (minutes >= 961 && minutes <= 1140) return greetings.evening;
  return greetings.night;
}

/** A greeting for the visitor's time of day, cycling through languages. */
export default function Greeting({ className = "" }: { className?: string }) {
  const [list, setList] = useState<string[]>(["Hello!"]);
  const [index, setIndex] = useState(0);

  // The visitor's local time is only known in the browser.
  useEffect(() => {
    setList(greetingsFor(new Date()));
    setIndex(0);
  }, []);

  useEffect(() => {
    if (list.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % list.length), 2800);
    return () => window.clearInterval(timer);
  }, [list]);

  const text = list[index % list.length];

  return (
    <p className={`overflow-hidden ${className}`}>
      <span className="sr-only">{list[0]}</span>
      <span key={text} aria-hidden className="greet block">
        {text}
      </span>
    </p>
  );
}
