"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { EASE } from "./motion";
import { skillCategories, skills, type Skill, type SkillCategory } from "../data/portfolio";

type Filter = "All" | SkillCategory;
const filters: Filter[] = ["All", ...skillCategories];

const countFor = (filter: Filter) =>
  filter === "All" ? skills.length : skills.filter((skill) => skill.category === filter).length;

function SkillTile({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  const tint = { "--tint": skill.color ?? "var(--accent)" } as CSSProperties;

  return (
    <div
      style={tint}
      className="group relative flex h-full flex-col items-start gap-3 overflow-hidden rounded-2xl border border-line bg-surface/60 p-3.5 transition-[border-color,background-color,translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface hover:shadow-soft sm:flex-row sm:items-center sm:gap-3.5 sm:p-3 sm:pr-4"
    >
      {/* Brand-tinted glow that blooms behind the logo on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-8 -left-8 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100 sm:top-1/2 sm:-translate-y-1/2"
        style={{ background: "color-mix(in srgb, var(--tint) 32%, transparent)" }}
      />
      <span className="relative grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-chip transition-transform duration-700 ease-spring group-hover:scale-110 group-hover:-rotate-6">
        {skill.logo ? (
          <Image
            src={skill.logo}
            alt=""
            className={`object-contain ${skill.wide ? "h-6 w-8" : "size-6"}`}
          />
        ) : Icon ? (
          <Icon aria-hidden className="size-[1.35rem] text-[#2a6a73]" strokeWidth={1.75} />
        ) : null}
      </span>
      <span className="relative min-w-0">
        <span className="block text-sm leading-snug font-medium text-fg sm:text-[0.95rem]">{skill.name}</span>
        <span className="mt-0.5 block text-[0.7rem] leading-snug text-muted sm:text-xs">{skill.kind}</span>
      </span>
    </div>
  );
}

/**
 * Smoothly animates its height to fit the content, so the section below glides
 * instead of jumping when the filter adds or removes rows. Overflow is only
 * clipped mid-animation, so hover shadows are never cut off.
 */
function AutoHeight({ children }: { children: ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ height }}
      transition={{ type: "spring", stiffness: 240, damping: 32 }}
      onAnimationStart={() => setAnimating(true)}
      onAnimationComplete={() => setAnimating(false)}
      style={{ overflow: animating ? "hidden" : "visible" }}
    >
      <div ref={inner}>{children}</div>
    </motion.div>
  );
}

/** Filterable grid of technologies; tiles glide into place when the filter changes. */
export default function SkillGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? skills : skills.filter((skill) => skill.category === filter);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Technologies</h3>
        <div
          role="group"
          aria-label="Filter technologies"
          className="flex self-start rounded-full border border-line bg-surface/60 p-1 sm:self-auto"
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
                    layoutId="skill-filter"
                    className="absolute inset-0 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">
                  {option}
                  <span className="ml-1 font-mono text-[0.65rem] opacity-60">{countFor(option)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AutoHeight>
        <ul className="relative grid grid-cols-2 gap-2.5 pt-6 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((skill, i) => (
              <motion.li
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                exit={{ opacity: 0, scale: 0.92, filter: "blur(4px)", transition: { duration: 0.25 } }}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                  delay: i * 0.035,
                  layout: { type: "spring", stiffness: 320, damping: 32 },
                }}
              >
                <SkillTile skill={skill} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </AutoHeight>
    </div>
  );
}
