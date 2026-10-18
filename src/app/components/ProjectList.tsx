"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Figma, Github } from "lucide-react";

import Gallery, { type GalleryItem } from "./Gallery";
import { EASE, fadeUp } from "./motion";
import { projectAreas, projects, type Project, type ProjectArea } from "../data/portfolio";

type Filter = "All" | ProjectArea;
const filters: Filter[] = ["All", ...projectAreas];

/** Each row fades up a beat after the one above it (`custom` is its place in the list). */
const row: Variants = {
  hidden: fadeUp.hidden,
  show: (place: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay: place * 0.08 },
  }),
};

const countFor = (filter: Filter) =>
  filter === "All" ? projects.length : projects.filter((project) => project.areas.includes(filter)).length;

/** The project's pictures, ready for the gallery. */
function galleryFor(project: Project): GalleryItem[] {
  return (project.gallery ?? []).map((frame) => ({
    key: `${project.title}-${frame.id}`,
    alt: frame.alt,
    thumb: frame.thumb,
    full: frame.full,
  }));
}

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

/** Thumbnails that wrap on wide screens and scroll sideways on phones; each opens the gallery at that picture. */
function Thumbnails({
  items,
  onOpen,
}: {
  items: GalleryItem[];
  onOpen: (index: number, button: HTMLButtonElement) => void;
}) {
  return (
    <ul className="relative z-10 -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pt-1 pb-2 [scrollbar-width:none] max-sm:[mask-image:linear-gradient(to_right,black_85%,transparent)] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
      {items.map((item, i) => (
        <li key={item.key} className="shrink-0">
          <button
            type="button"
            onClick={(event) => onOpen(i, event.currentTarget)}
            aria-label={`View larger: ${item.alt}`}
            className="group/thumb relative block h-16 cursor-zoom-in overflow-hidden rounded-lg border border-line bg-surface transition-[border-color,translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-soft sm:h-[4.5rem]"
          >
            <motion.div layoutId={`gallery-${item.key}`} className="h-full">
              <Image src={item.thumb} alt="" sizes="200px" className="h-full w-auto max-w-none" />
            </motion.div>
          </button>
        </li>
      ))}
    </ul>
  );
}

/**
 * Numbered project rows with a soft spotlight that follows the cursor, a
 * filter by kind of work, and thumbnails that open each project's gallery.
 */
export default function ProjectList() {
  const [filter, setFilter] = useState<Filter>("All");
  // Rows animate on their own state rather than inheriting it from the list, so
  // rows that come back after a filter change still fade in.
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState<{ project: number; index: number; origin: number } | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const trackPointer = (event: PointerEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  const close = () => {
    setOpen(null);
    // Hand keyboard focus back to the thumbnail that opened the gallery.
    window.setTimeout(() => opener.current?.focus({ preventScroll: true }), 0);
  };

  const shown = projects
    .map((project, number) => ({ project, number }))
    .filter(({ project }) => filter === "All" || project.areas.includes(filter));
  const openProject = open ? projects[open.project] : null;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects"
        className="mb-6 inline-flex rounded-full border border-line bg-surface/60 p-1"
      >
        {filters.map((option) => {
          const selected = filter === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(option)}
              className={`relative rounded-full px-2.5 py-1.5 text-sm transition-colors duration-300 min-[380px]:px-3 sm:px-3.5 ${
                selected ? "text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">
                {option}
                <span className="ml-1 text-[0.7rem] tabular-nums opacity-60">{countFor(option)}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul
        className="border-t border-line"
        onViewportEnter={() => setRevealed(true)}
        viewport={{ once: true, amount: 0.15 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map(({ project, number }, place) => {
            const items = galleryFor(project);
            return (
              <motion.li
                key={project.title}
                layout
                variants={row}
                custom={place}
                initial="hidden"
                animate={revealed ? "show" : "hidden"}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)", transition: { duration: 0.25 } }}
                transition={{ layout: { type: "spring", stiffness: 320, damping: 34 } }}
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
                <div className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-x-6 md:py-8">
                  <span className="pt-1.5 text-sm text-muted tabular-nums">{String(number + 1).padStart(2, "0")}</span>

                  <div className="min-w-0">
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
                    <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
                      <span className="mr-1 tabular-nums">{project.year}</span>
                      {project.areas.map((area) => (
                        <span key={area} className="rounded-full border border-line px-2 py-0.5">
                          {area}
                        </span>
                      ))}
                    </p>
                    <p className="mt-2 max-w-xl leading-relaxed text-pretty text-muted">{project.description}</p>
                    {items.length > 0 && (
                      <Thumbnails
                        items={items}
                        onOpen={(index, button) => {
                          opener.current = button;
                          setOpen({ project: number, index, origin: index });
                        }}
                      />
                    )}
                  </div>

                  <div className="relative z-10 col-start-2 mt-2 flex gap-2 sm:col-start-3 sm:row-start-1 sm:mt-0 sm:self-start">
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
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {open && openProject && (
          <Gallery
            key="gallery"
            title={openProject.title}
            items={galleryFor(openProject)}
            index={open.index}
            origin={open.origin}
            onIndex={(index) => setOpen((state) => (state ? { ...state, index, origin: -1 } : state))}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
