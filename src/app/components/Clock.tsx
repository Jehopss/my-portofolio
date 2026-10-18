"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit" });

/** Jonathan's local time (Western Indonesia Time), updated every half minute. */
export default function Clock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className={`tabular-nums ${className}`}>
      <time>{time ?? "UTC+7"}</time>
    </p>
  );
}
