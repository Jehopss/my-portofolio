import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import portrait from "../assets/profile.webp";
import Greeting from "./Greeting";
import { profile, socials } from "../data/portfolio";

/** Start time of one step in the CSS load sequence (see globals.css). */
const at = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * Where the face sits in profile.webp, as fractions of the photo. The card has
 * the photo's own 4:5 ratio, so these hold at every size. Update them if the
 * photo changes.
 */
const FACE = { left: "25%", top: "16.5%", width: "49.5%", height: "49%" };

/** Corner brackets of the detection box: [position, borders]. */
const CORNERS = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
];

/**
 * Portrait with a face-detection overlay, a nod to the computer-vision work.
 * The card wipes in, then the box locks onto the face and its label appears.
 */
function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem]">
      <div
        style={at(0.35)}
        className="intro-card relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-soft"
      >
        <div style={at(0.45)} className="intro-wipe absolute inset-0">
          <div style={at(0.45)} className="intro-settle absolute inset-0">
            <Image
              src={portrait}
              alt="Portrait of Jonathan Hopi Pranata"
              fill
              priority
              sizes="(min-width: 768px) 352px, 100vw"
              className="object-cover dark:brightness-[0.92] dark:saturate-[0.85]"
            />
          </div>
        </div>

        <div aria-hidden style={{ ...FACE, ...at(1.5) }} className="detect-box pointer-events-none absolute">
          <span className="absolute inset-0 border border-detect/45" />
          {CORNERS.map((corner) => (
            <span key={corner} className={`absolute size-4 border-detect ${corner}`} />
          ))}
          <span
            style={at(1.95)}
            className="detect-tag absolute bottom-full left-0 mb-1.5 flex items-center gap-1.5 rounded-[5px] bg-detect px-1.5 py-1 text-[0.7rem] leading-none font-medium whitespace-nowrap text-detect-fg"
          >
            jonathan
            <span className="tabular-nums opacity-75">0.98</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const words = profile.name.split(" ");

  return (
    <section id="top">
      <div className="shell grid items-center gap-12 pt-32 pb-20 md:grid-cols-12 md:gap-10 md:pt-40 md:pb-28">
        <div className="md:col-span-7">
          <div style={at(0.2)} className="intro mb-8 md:hidden">
            <Image
              src={portrait}
              alt=""
              priority
              sizes="80px"
              className="size-20 rounded-full object-cover object-[50%_18%] ring-1 ring-line dark:brightness-[0.92] dark:saturate-[0.85]"
            />
          </div>

          <div style={at(0.25)} className="intro">
            <Greeting className="text-xl text-muted md:text-2xl" />
          </div>

          <h1 className="mt-4 text-[clamp(2.9rem,6.8vw,5.9rem)] leading-[1.02] font-medium tracking-[-0.045em] text-balance text-fg">
            {words.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && " "}
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <span style={at(0.35 + i * 0.09)} className="intro-word">
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
          </h1>

          <p
            style={at(0.7)}
            className="intro mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-muted md:text-xl"
          >
            {profile.summary}
          </p>

          <div style={at(0.85)} className="intro mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg pr-5 pl-6 text-sm font-medium text-bg transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-soft"
            >
              View projects
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-medium text-fg transition-colors duration-300 hover:bg-surface"
            >
              Get in touch
            </a>
            {/* Kept in one group so the icons always wrap together on narrow screens. */}
            <div className="flex items-center gap-1">
              <span aria-hidden className="mr-2 ml-1 hidden h-6 w-px bg-line sm:block" />
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid size-12 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-surface hover:text-fg"
                >
                  <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:col-span-5 md:block">
          <Portrait />
        </div>
      </div>
    </section>
  );
}
