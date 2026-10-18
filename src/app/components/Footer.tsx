import type { CSSProperties } from "react";

import Clock from "./Clock";
import Greeting from "./Greeting";
import ThemeToggle from "./ThemeToggle";
import { contacts, navItems, profile, socials } from "../data/portfolio";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** The close: two rows of filled tiles in the palette's colours, every cell used. */
export default function Footer() {
  const email = contacts.find((c) => c.label === "Personal email") ?? contacts[0];
  const tile = "flex flex-col justify-between gap-6 p-5";

  return (
    <footer className="grid grid-cols-2 gap-2 px-2 pb-2 md:grid-cols-12 md:px-3 md:pb-3">
      <div data-reveal className={`${tile} order-1 col-span-2 h-40 items-center justify-center bg-[#16425b] text-[#d9dcd6] md:order-5 md:col-span-8 md:h-80`}>
        <p aria-hidden className="text-display leading-none font-medium tracking-[-0.045em]">
          Jonathan
        </p>
      </div>

      <a
        href={email.href}
        data-reveal
        style={order(1)}
        className={`${tile} group order-2 col-span-2 min-h-48 bg-[#2f6690] text-white md:order-6 md:col-span-4 md:h-80`}
      >
        <span className="text-heading leading-tight font-medium">Write to Jonathan</span>
        <svg
          aria-hidden
          viewBox="0 0 48 48"
          className="size-12 self-end transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="square"
        >
          <path d="M12 36 36 12M16 12h20v20" />
        </svg>
      </a>

      <nav
        aria-label="Sections"
        data-reveal
        style={order(2)}
        className={`${tile} order-3 bg-[#81c3d7] text-[#16425b] md:order-2 md:col-span-3 md:h-56`}
      >
        <ul className="flex flex-col">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="underline-offset-4 hover:underline">
                {item.label}
              </a>
            </li>
          ))}
          {socials.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle withLabel className="self-start" />
      </nav>

      <div data-reveal style={order(3)} className={`${tile} order-4 bg-surface md:order-4 md:col-span-3 md:h-56 md:justify-end`}>
        <p className="text-muted">Email</p>
        <a href={email.href} className="text-lead leading-tight [overflow-wrap:anywhere] underline-offset-4 hover:underline">
          {email.value}
        </a>
      </div>

      <div data-reveal style={order(4)} className={`${tile} order-5 bg-[#3a7ca5] text-white md:order-3 md:col-span-2 md:h-56`}>
        <p>Jonathan’s time</p>
        <div>
          <Clock className="text-lead leading-tight" />
          <p className="text-small">WIB, UTC+7</p>
        </div>
      </div>

      <div data-reveal style={order(5)} className={`${tile} order-6 bg-surface-2 md:order-1 md:col-span-4 md:h-56`}>
        <Greeting className="text-lead leading-tight" />
        <p className="text-small">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
