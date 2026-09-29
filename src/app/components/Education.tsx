import Frame from "./Frame";
import { education } from "../data/portfolio";

export default function Education() {
  return (
    <Frame id="education" name="Education">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h3 className="display text-[clamp(2.4rem,5vw,4rem)]">{education.school}</h3>
          <p className="mt-5 text-lg text-pretty">{education.degree}</p>
          <dl className="mt-8 grid grid-cols-2 border-t border-rule">
            <div className="border-r border-rule py-4 pr-4">
              <dt className="machine text-[0.875rem] text-muted">Period</dt>
              <dd className="mt-1.5 tabular-nums">{education.period}</dd>
            </div>
            <div className="py-4 pl-4">
              <dt className="machine text-[0.875rem] text-muted">Status</dt>
              <dd className="mt-1.5">{education.status}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <h4 className="machine flex items-baseline justify-between text-[0.875rem] text-muted">
            Relevant courses
            <span>{education.courses.length}</span>
          </h4>
          {/* Fills down each column, like a transcript. */}
          <ul className="mt-3 gap-x-8 border-t border-rule sm:columns-2">
            {education.courses.map((course) => (
              <li key={course} className="break-inside-avoid border-b border-rule py-2.5">
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}
