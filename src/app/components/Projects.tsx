import type { ReactNode } from "react";
import { ArrowUpRight, Figma, Github } from "lucide-react";

import Frame from "./Frame";
import Selectable from "./Selectable";
import { projects } from "../data/portfolio";

function ProjectLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 items-center gap-2 border border-rule-strong bg-frame px-3 text-sm text-ink transition-colors hover:border-ink"
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3.5 text-muted" />
    </a>
  );
}

export default function Projects() {
  return (
    <Frame id="projects" name="Projects">
      <p className="max-w-md text-muted">Selected work across interface design and machine learning.</p>

      <ul className="mt-8 border-t border-rule">
        {projects.map((project) => (
          <Selectable key={project.title} className="-mx-3 border-b border-rule px-3">
            <div className="grid gap-5 py-7 lg:grid-cols-12 lg:gap-8 lg:py-9">
              <h3 className="display text-[clamp(2rem,4.4vw,3.5rem)] lg:col-span-7">
                {/* The title's link stretches over the whole row. */}
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-none after:absolute after:inset-0 after:content-['']"
                >
                  {project.title}
                </a>
              </h3>

              <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-1">
                <ul className="flex flex-wrap gap-1.5">
                  {project.areas.map((area) => (
                    <li key={area} className="machine border border-rule-strong px-1.5 pt-1 pb-0.5 text-[0.8125rem] text-muted">
                      {area}
                    </li>
                  ))}
                </ul>
                <p className="leading-relaxed text-pretty text-muted">{project.description}</p>
                <div className="relative z-20 flex flex-wrap gap-2">
                  {project.figma && (
                    <ProjectLink href={project.figma} label={`Open the ${project.title} design in Figma`}>
                      <Figma aria-hidden className="size-4" strokeWidth={1.6} />
                      Design
                    </ProjectLink>
                  )}
                  <ProjectLink href={project.repo} label={`View the ${project.title} source code on GitHub`}>
                    <Github aria-hidden className="size-4" strokeWidth={1.6} />
                    Code
                  </ProjectLink>
                </div>
              </div>
            </div>
          </Selectable>
        ))}
      </ul>
    </Frame>
  );
}
