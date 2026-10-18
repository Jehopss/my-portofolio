"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit" });

/** Jonathan's local time (Western Indonesia Time), so visitors know when he's likely to reply. */
export default function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className={`inline-flex items-center gap-2.5 text-sm text-muted ${className}`}>
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/40 motion-reduce:animate-none" />
        <span className="relative size-2 rounded-full bg-accent" />
      </span>
      {time ? (
        <span>
          It’s <time className="text-fg tabular-nums">{time}</time> for me in Indonesia (WIB, UTC+7).
        </span>
      ) : (
        <span>Based in Indonesia (WIB, UTC+7).</span>
      )}
    </p>
  );
}
