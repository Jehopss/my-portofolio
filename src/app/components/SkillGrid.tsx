import Image from "next/image";

import { skillCategories, skills, type Skill } from "../data/portfolio";

function SkillRow({ skill }: { skill: Skill }) {
  const Icon = skill.icon;

  return (
    <li className="flex items-center gap-3.5 border-b border-line py-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-chip">
        {skill.logo ? (
          <Image src={skill.logo} alt="" className={`object-contain ${skill.wide ? "h-5 w-7" : "size-5"}`} />
        ) : Icon ? (
          // The chip stays light in both themes, so the fallback icon keeps the light-theme accent.
          <Icon aria-hidden className="size-5 text-[#2a6a73]" strokeWidth={1.75} />
        ) : null}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.95rem] leading-snug font-medium text-fg">{skill.name}</span>
        <span className="block text-xs leading-snug text-muted">{skill.kind}</span>
      </span>
    </li>
  );
}

/** Every technology at once, grouped by what kind of tool it is. */
export default function SkillGrid() {
  return (
    <div>
      <h3 className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Technologies</h3>
      <div className="mt-5 grid gap-10 md:grid-cols-3">
        {skillCategories.map((category) => {
          const items = skills.filter((skill) => skill.category === category);
          return (
            <div key={category} className="min-w-0">
              <h4 className="flex items-baseline justify-between border-b border-line-strong pb-2.5 text-sm font-medium text-fg">
                {category}
                <span className="text-xs font-normal text-subtle tabular-nums">{items.length}</span>
              </h4>
              <ul>
                {items.map((skill) => (
                  <SkillRow key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
