import { ArrowRight, ArrowUpRight } from "lucide-react";

import Greeting from "./Greeting";
import PortraitPipeline from "./PortraitPipeline";
import { profile, socials } from "../data/portfolio";

/**
 * The opening frame. On phones the portrait sits between the name and the
 * summary; from `lg` up it takes the right-hand column beside both.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="name" className="scroll-mt-20">
      <p className="mb-2 flex items-center gap-1.5 text-[0.8125rem] leading-none text-muted">
        <span aria-hidden className="text-rule-strong">
          #
        </span>
        Home
      </p>
      <div className="grid gap-10 bg-frame px-5 py-8 [grid-template-areas:'top'_'portrait'_'bottom'] sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-14 lg:gap-y-12 lg:px-12 lg:py-14 lg:[grid-template-areas:'top_portrait'_'bottom_portrait']">
        <div className="min-w-0 [grid-area:top]">
          <Greeting className="text-lg text-muted" />
          <h1 id="name" className="display mt-6 text-[clamp(3.1rem,10.5vw,7.25rem)] text-ink">
            {profile.name.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h1>
        </div>

        <div className="mx-auto w-full max-w-md [grid-area:portrait] lg:max-w-none">
          <PortraitPipeline />
        </div>

        <div className="min-w-0 self-end [grid-area:bottom]">
          <p className="max-w-xl text-xl leading-snug text-pretty text-ink md:text-2xl">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 bg-ink px-5 text-sm font-medium text-frame transition-colors hover:bg-accent hover:text-accent-fg"
            >
              View projects
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center border border-ink px-5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-frame"
            >
              Get in touch
            </a>
            <ul className="flex items-center gap-4 sm:ml-2">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-1 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {label}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
