import type { ReactNode } from "react";
import { ArrowUpRight, Figma, Github } from "lucide-react";

import { projects } from "../data/portfolio";

function ProjectLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-bg px-3.5 text-sm text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
    >
      {children}
    </a>
  );
}

/** Project rows. The whole row opens the repository; Design and Code are direct links. */
export default function ProjectList() {
  return (
    <ul className="border-t border-line">
      {projects.map((project) => (
        <li key={project.title} className="group relative border-b border-line">
          <div className="grid gap-x-8 gap-y-4 py-7 sm:grid-cols-[1fr_auto] md:py-8">
            <div className="min-w-0">
              <h3 className="text-xl font-medium tracking-tight text-balance text-fg md:text-2xl">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
                >
                  <span className="transition-colors duration-300 group-hover:text-accent">{project.title}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="ml-1 inline size-5 -translate-x-1 translate-y-0.5 text-accent opacity-0 transition-[opacity,translate] duration-500 ease-out-expo group-hover:translate-x-0 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </a>
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-pretty text-muted">{project.description}</p>
            </div>

            <div className="relative z-10 flex gap-2 sm:self-start">
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
        </li>
      ))}
    </ul>
  );
}
