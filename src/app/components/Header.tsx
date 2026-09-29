"use client";

import { useEffect, useState } from "react";

import ThemeToggle from "./ThemeToggle";
import { navItems } from "../data/portfolio";

export default function Header() {
  const [active, setActive] = useState("");

  // Scroll-spy: mark whichever frame crosses the middle of the viewport.
  useEffect(() => {
    const frames = ["top", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? "" : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    frames.forEach((frame) => observer.observe(frame));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-rule-strong/60 bg-canvas/90 backdrop-blur-md">
      <div className="shell flex h-14 items-center gap-4">
        <a href="#top" className="shrink-0 text-[0.95rem] font-semibold tracking-tight text-ink">
          <span className="sm:hidden" aria-hidden>
            JHP
          </span>
          <span className="max-sm:sr-only">Jonathan Hopi Pranata</span>
        </a>

        {/* Scrolls sideways inside itself on narrow screens; the page never does. */}
        <nav
          aria-label="Sections"
          className="ml-auto min-w-0 overflow-x-auto [scrollbar-width:none] max-sm:[mask-image:linear-gradient(to_right,black_80%,transparent)] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex items-center gap-5 pr-8 text-sm whitespace-nowrap sm:gap-7 sm:pr-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`block border-b-2 py-1 transition-colors ${
                      isActive ? "border-signal text-ink" : "border-transparent text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
