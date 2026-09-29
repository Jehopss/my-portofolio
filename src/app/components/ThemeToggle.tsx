"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/** Browser-chrome colour for each theme: the canvas grey behind the frames. */
const CHROME: Record<Theme, string> = { light: "#d9dcd6", dark: "#0a1b25" };

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just won't persist */
    }
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute("content", CHROME[next]));
    setTheme(next);
  };

  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title="Toggle theme"
      className="grid size-9 shrink-0 place-items-center border border-rule-strong text-muted transition-colors hover:border-ink hover:text-ink"
    >
      <Icon aria-hidden className="size-4" strokeWidth={1.75} />
    </button>
  );
}
