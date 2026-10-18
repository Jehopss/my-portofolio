import type { CSSProperties } from "react";

import Frame from "./Frame";
import ThemeToggle from "./ThemeToggle";
import { contacts, education, profile, sheet, socials } from "../data/portfolio";

/** Vertical starting offsets, so the sheet's rows never line up. */
const OFFSETS = [0, -90, -40, -130, -20, -70];
/** How fast each column drifts while the page scrolls (see Motion.tsx). */
const DRIFT = [0.06, 0.13, 0.04, 0.1, 0.08, 0.15];

const rise = (i: number) => ({ "--i": i }) as CSSProperties;

/** Deal the sheet's frames into `count` columns, left to right. */
function deal(count: number) {
  const columns = Array.from({ length: count }, () => [] as typeof sheet);
  sheet.forEach((item, i) => columns[i % count].push(item));
  return columns;
}

function Sheet({ count, className, offsets }: { count: number; className: string; offsets: number[] }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {deal(count).map((column, c) => (
        <div key={c} data-drift={DRIFT[c]} className="flex min-w-0 flex-1 flex-col gap-3" style={{ marginTop: offsets[c] }}>
          {column.map(({ frame, label, colour }, i) => (
            <Frame
              key={frame.id}
              frame={frame}
              group="sheet"
              label={label}
              colour={colour}
              priority={i < 2}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * First screen: the name at display size, four short blocks (who, what,
 * where to reach him, the action), then the contact sheet of every frame.
 */
export default function Hero() {
  const email = contacts.find((c) => c.label === "Personal email") ?? contacts[0];

  return (
    <header id="top">
      <div className="page pt-6 md:pt-8">
        <h1 data-rise style={rise(0)} className="text-display leading-[0.92] font-medium tracking-[-0.045em]">
          Jonathan Hopi Pranata
        </h1>

        <div data-rise style={rise(1)} className="mt-6 grid gap-x-6 gap-y-4 md:mt-8 md:grid-cols-12">
          <p className="md:col-span-3">
            Computer Science student in the {profile.program} at {profile.school}, now in the{" "}
            {education.status.toLowerCase()}.
          </p>
          <p className="md:col-span-4">
            I design interfaces in Figma and build the machine-learning models behind them. Below are frames from
            five of those projects; tap one to see it full size.
          </p>
          <p className="md:col-span-3">
            <a href={email.href} className="text-link">
              {email.value}
            </a>
            <br />
            {socials.map(({ label, href }, i) => (
              <span key={label}>
                {i > 0 && " and "}
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">
                  {label}
                </a>
              </span>
            ))}
          </p>
          <div className="flex items-start gap-3 md:col-span-2 md:justify-end">
            <a href="#work" className="button">
              See the work
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div
        data-rise
        style={rise(2)}
        aria-label="Contact sheet of project frames"
        role="region"
        className="page mt-8 h-[30rem] overflow-hidden md:mt-10 md:h-[38rem]"
      >
        <Sheet count={2} offsets={[0, -60]} className="md:hidden" />
        <Sheet count={6} offsets={OFFSETS} className="hidden md:flex" />
      </div>
    </header>
  );
}
