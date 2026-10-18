import Image from "next/image";
import type { CSSProperties } from "react";

import { skillCategories, skills } from "../data/portfolio";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Tools: two-ended rows grouped by kind, on the same 34% line as About; two columns on wide screens. */
export default function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="page mt-[var(--section-gap)] scroll-mt-6">
      <div className="md:ml-[34%] lg:max-w-[60rem]">
        <h2 id="tools-title" data-reveal className="text-heading leading-tight font-medium">
          Tools I work with
        </h2>

        <div className="mt-8 flex flex-col gap-8 md:gap-10 lg:block lg:columns-2 lg:gap-12">
          {skillCategories.map((category) => (
            <div key={category} className="break-inside-avoid lg:mb-10">
              <h3 data-reveal className="text-muted">
                {category}
              </h3>
              <ul className="mt-1">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <li
                        key={skill.name}
                        data-reveal
                        style={order(i)}
                        className="flex min-h-11 items-baseline justify-between gap-4 py-1.5"
                      >
                        <span className="flex items-center gap-3 self-center text-lead leading-tight">
                          <span className="grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-chip">
                            {skill.logo ? (
                              <Image src={skill.logo} alt="" className="size-4 object-contain" />
                            ) : Icon ? (
                              // The chip stays light in both themes, so the icon keeps the light ink.
                              <Icon aria-hidden className="size-4 text-[#16425b]" strokeWidth={2} />
                            ) : null}
                          </span>
                          {skill.name}
                        </span>
                        <span className="text-right text-muted">{skill.kind}</span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
