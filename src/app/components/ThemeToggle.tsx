"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const THEME_COLORS: Record<Theme, string> = { light: "#f3f4f1", dark: "#0a1b25" };

/**
 * Light/dark switch. Where the browser supports the View Transitions API the
 * new theme spreads out from the button as a growing circle; everywhere else
 * (or with reduced motion) it simply swaps.
 */
export default function ThemeToggle({ withLabel = false, className = "" }: { withLabel?: boolean; className?: string }) {
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
        /* private mode: the choice just won't persist */
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
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.dataset.switching = "";
    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
    transition.finished.finally(() => {
      delete root.dataset.switching;
    });
  };

  const label = theme === "dark" ? "Light mode" : "Dark mode";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={withLabel ? undefined : `Switch to ${label.toLowerCase()}`}
      title={withLabel ? undefined : label}
      className={`inline-flex min-h-11 items-center gap-2 transition-transform active:scale-[0.97] ${
        withLabel ? "" : "w-11 justify-center bg-surface-2 text-fg hover:bg-fg hover:text-bg"
      } ${className}`}
    >
      <Icon aria-hidden className="size-4" strokeWidth={1.75} />
      {withLabel && <span className="underline-offset-4 hover:underline">{label}</span>}
    </button>
  );
}
