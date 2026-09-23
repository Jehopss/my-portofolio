"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Figma, Github } from "lucide-react";

import { fadeUp, stagger } from "./motion";
import { projects } from "../data/portfolio";

function IconLink({
  href,
  label,
  title,
  children,
}: {
  href: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={title}
      className="grid size-10 place-items-center rounded-full border border-line bg-bg/60 text-muted transition-[color,border-color,translate] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
    >
      {children}
    </a>
  );
}

/** Numbered project rows with a soft spotlight that follows the cursor. */
export default function ProjectList() {
  const trackPointer = (event: PointerEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.ul
      className="border-t border-line"
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {projects.map((project, i) => (
        <motion.li
          key={project.title}
          variants={fadeUp}
          onPointerMove={trackPointer}
          className="group relative border-b border-line"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -inset-x-3 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:-inset-x-5"
            style={{
              background:
                "radial-gradient(28rem circle at var(--x, 50%) var(--y, 50%), var(--accent-soft), transparent 70%)",
            }}
          />
          <div className="relative grid grid-cols-[2.25rem_1fr] gap-x-3 py-7 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 md:py-8">
            <span className="pt-1.5 text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>

            <div>
              <h3 className="text-xl font-medium tracking-tight text-balance text-fg md:text-2xl">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-accent"
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

            <div className="relative z-10 col-start-2 mt-4 flex gap-2 sm:col-start-3 sm:row-start-1 sm:mt-0 sm:self-start">
              {project.figma && (
                <IconLink
                  href={project.figma}
                  label={`Open the ${project.title} design in Figma`}
                  title="View Figma design"
                >
                  <Figma aria-hidden className="size-[1.1rem]" strokeWidth={1.6} />
                </IconLink>
              )}
              <IconLink
                href={project.repo}
                label={`View the ${project.title} source code on GitHub`}
                title="View code on GitHub"
              >
                <Github aria-hidden className="size-[1.1rem]" strokeWidth={1.6} />
              </IconLink>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
