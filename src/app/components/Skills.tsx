import Image from "next/image";

import Frame from "./Frame";
import { expertise, skills, type SkillCategory } from "../data/portfolio";

const SINGULAR: Record<SkillCategory, string> = {
  Languages: "Language",
  Libraries: "Library",
  Tools: "Tool",
};

export default function Skills() {
  return (
    <Frame id="skills" name="Skills">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <h3 className="display text-[clamp(2.4rem,5vw,4rem)]">Technologies</h3>
        <p className="max-w-xs text-muted sm:pb-1 sm:text-right">
          {skills.length} languages, libraries and tools I work with.
        </p>
      </div>

      {/* 16 cells: a clean 4 × 4 on wide screens, 2 × 8 on phones. */}
      <ul className="mt-8 grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <li key={skill.name} className="flex min-h-40 flex-col justify-between gap-6 bg-frame p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <span className="grid size-10 shrink-0 place-items-center border border-rule bg-chip">
                  {skill.logo ? (
                    <Image src={skill.logo} alt="" className={`object-contain ${skill.wide ? "h-5 w-7" : "size-5"}`} />
                  ) : Icon ? (
                    // The tile stays light in both themes, so the icon keeps a fixed dark ink.
                    <Icon aria-hidden className="size-5 text-[#16425b]" strokeWidth={1.75} />
                  ) : null}
                </span>
                <span className="machine text-[0.8125rem] text-muted">{SINGULAR[skill.category]}</span>
              </div>
              <div>
                <p className="leading-snug font-medium">{skill.name}</p>
                <p className="mt-0.5 text-sm leading-snug text-muted">{skill.kind}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <h3 className="machine mt-16 text-[0.875rem] text-muted lg:mt-20">Areas of expertise</h3>
      <ul className="mt-4 text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.3] font-medium tracking-[-0.02em]">
        {expertise.map(({ name }, i) => (
          <li key={name} className="inline">
            {i > 0 && (
              <span aria-hidden className="px-[0.3em] font-light text-rule-strong">
                /
              </span>
            )}
            {name}
          </li>
        ))}
      </ul>
    </Frame>
  );
}
