"use client";

/** Lets keyboard users jump straight past the navigation. */
export default function SkipLink() {
  return (
    <a
      href="#main"
      onClick={() => document.getElementById("main")?.focus({ preventScroll: true })}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
    >
      Skip to content
    </a>
  );
}
