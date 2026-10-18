"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const THEME_COLORS: Record<Theme, string> = { light: "#f4f3ee", dark: "#101312" };

/**
 * Light/dark switch. Where the browser supports the View Transitions API the
 * new theme spreads out from the button as a growing circle; everywhere else
 * (or with reduced motion) it simply swaps.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";

    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* private mode — the choice just won't persist */
      }
      document
        .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
        .forEach((meta) => meta.setAttribute("content", THEME_COLORS[next]));
      setTheme(next);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || reduceMotion) {
      apply();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.dataset.switching = "";
    const transition = document.startViewTransition(apply);

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 750,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});

    transition.finished.finally(() => {
      delete root.dataset.switching;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      title="Toggle theme"
      className={`relative grid size-10 place-items-center rounded-full border border-line bg-surface/70 text-muted backdrop-blur-md transition-colors duration-300 hover:border-line-strong hover:text-fg ${className}`}
    >
      <Sun aria-hidden className="theme-icon theme-icon--sun absolute size-[18px]" strokeWidth={1.75} />
      <Moon aria-hidden className="theme-icon theme-icon--moon absolute size-[18px]" strokeWidth={1.75} />
    </button>
  );
}
