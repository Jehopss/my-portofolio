import Section from "./Section";
import { Reveal, StaggerList } from "./motion";
import { education } from "../data/portfolio";

export default function Education() {
  return (
    <Section id="education" index="02" title="Education">
      <Reveal>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h3 className="text-2xl font-medium tracking-tight text-fg md:text-[1.75rem]">
            {education.school}
          </h3>
          <p className="text-sm text-muted tabular-nums">{education.period}</p>
        </div>
        <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="text-lg text-accent">{education.degree}</p>
          <p className="text-sm text-muted tabular-nums">{education.status}</p>
        </div>
      </Reveal>

      <div className="mt-12 border-t border-line pt-8">
        <Reveal>
          <h4 className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Relevant courses</h4>
        </Reveal>
        <StaggerList className="mt-5 flex flex-wrap gap-2" step={0.035}>
          {education.courses.map((course) => (
            <span
              key={course}
              className="inline-flex rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-muted transition-colors duration-300 hover:border-accent/50 hover:text-fg"
            >
              {course}
            </span>
          ))}
        </StaggerList>
      </div>
    </Section>
  );
}
