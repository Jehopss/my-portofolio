import Section from "./Section";
import { education } from "../data/portfolio";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="text-2xl font-medium tracking-tight text-fg md:text-[1.75rem]">{education.school}</h3>
        <p className="text-sm text-muted tabular-nums">{education.period}</p>
      </div>
      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <p className="text-lg text-accent">{education.degree}</p>
        <p className="text-sm text-muted tabular-nums">{education.status}</p>
      </div>

      <div className="mt-12">
        <h4 className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Relevant courses</h4>
        {/* Reads like a transcript: fills down each column, not across. */}
        <ul className="mt-4 gap-x-10 border-t border-line sm:columns-2">
          {education.courses.map((course) => (
            <li key={course} className="break-inside-avoid border-b border-line py-3 text-[0.95rem] text-fg">
              {course}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
