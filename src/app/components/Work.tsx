"use client";

import { useState, type CSSProperties } from "react";

import Frame from "./Frame";
import { projects, type ProjectArea } from "../data/portfolio";
import { frames } from "../data/frames";

type Filter = "All" | ProjectArea;
const FILTERS: { value: Filter; label: string }[] = [
  { value: "All", label: "All work" },
  { value: "Interface design", label: "Interfaces" },
  { value: "Machine learning", label: "Models" },
];

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** The one enlarged frame: Finwise's own screen recording, opening like a shutter. */
function Recording() {
  return (
    <div className="shutter overflow-hidden bg-chip">
      <video
        data-autoplay
        muted
        loop
        playsInline
        preload="metadata"
        poster={frames.fwDashboard.full.src}
        aria-label="Screen recording of Finwise: the dashboard, the recent transactions and the categories page"
        className="block aspect-[1280/630] w-full"
      >
        <source src="work/finwise-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

/**
 * Work: a sticky rail with the section name and two filters, then one strip
 * of frames per project with its name, kind and year beneath.
 */
export default function Work() {
  const [filter, setFilter] = useState<Filter>("All");

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="page mt-[var(--section-gap)] scroll-mt-6 md:grid md:grid-cols-[13%_minmax(0,1fr)] md:gap-6"
    >
      <div className="mb-8 flex items-baseline justify-between gap-4 md:sticky md:top-6 md:mb-0 md:block md:self-start">
        <h2 id="work-title" data-reveal className="text-heading leading-tight font-medium">
          Work
        </h2>
        <div role="group" aria-label="Show work by kind" data-reveal style={order(1)} className="flex gap-4 md:mt-4 md:flex-col md:gap-1">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`min-h-11 text-left transition-colors md:min-h-0 ${
                filter === value ? "font-medium text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ul className="work-list flex flex-col gap-14 md:gap-16">
        {projects.map((project) => {
          const hidden = filter !== "All" && !project.areas.includes(filter);
          return (
            <li key={project.title} hidden={hidden} className="flex flex-col gap-14 md:gap-16">
              {/* A long strip carries its words beneath; a short one keeps them in a fixed column beside it. */}
              <article
                aria-labelledby={`${project.title}-title`}
                className={`flex flex-col gap-4 ${
                  project.frames.length <= 2 ? "md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start md:gap-8" : ""
                }`}
              >
                <div className="work-frames flex max-w-full flex-wrap gap-2">
                  {project.frames.map((frame, i) => (
                    <div key={frame.id} data-unmask style={order(i)}>
                      <Frame
                        frame={frame}
                        group={project.title}
                        label={project.label ?? project.title}
                        height={200}
                        className="max-md:[&_img]:!h-[110px]"
                      />
                    </div>
                  ))}
                </div>

                <div className="min-w-0">
                  <div data-reveal style={order(1)} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4">
                    <h3 id={`${project.title}-title`} className="flex items-baseline gap-2 font-medium">
                      <span aria-hidden className="size-2.5 shrink-0" style={{ background: project.colour.fill }} />
                      {project.title}
                    </h3>
                    <p className="min-w-0 text-muted max-sm:invisible">{project.kind}</p>
                    <p className="text-right text-muted tabular-nums">{project.year}</p>
                  </div>
                  <p data-reveal style={order(2)} className="mt-1 max-w-[60ch]">
                    {project.description}
                  </p>
                  <p data-reveal style={order(3)} className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                    {project.figma && (
                      <a href={project.figma} target="_blank" rel="noopener noreferrer" className="text-link">
                        Design in Figma
                      </a>
                    )}
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-link">
                      Code on GitHub
                    </a>
                  </p>
                </div>
              </article>
              {project.title === "Finwise" && <Recording />}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
