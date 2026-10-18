import type { CSSProperties } from "react";

import { education, expertise, profile } from "../data/portfolio";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Two halves of a list, so it reads down one column and then the next. */
function TwoColumns({ items }: { items: string[] }) {
  const half = Math.ceil(items.length / 2);
  return (
    <div className="grid gap-x-12 gap-y-2 text-lead leading-[1.3] sm:grid-cols-2 sm:gap-y-0 md:max-w-[56rem]">
      {[items.slice(0, half), items.slice(half)].map((column, c) => (
        <ul key={c} className="flex flex-col gap-2">
          {column.map((item, i) => (
            <li key={item} data-reveal style={order(i)}>
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/**
 * About: the facts in a narrow column, the paragraph from the 34% line, then
 * the record (courses, areas of focus) on the same line further down.
 */
export default function About() {
  const facts = [
    ["Studying", `Computer Science, ${profile.program}`],
    ["At", education.school],
    ["Year", `${education.status}, since ${education.period.split(" ")[0]}`],
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="page mt-[var(--section-gap)] scroll-mt-6 grid gap-x-6 gap-y-10 md:grid-cols-[minmax(0,34fr)_minmax(0,56fr)_minmax(0,10fr)]"
    >
      <h2 id="about-title" className="sr-only">
        About
      </h2>

      <p
        data-reveal
        className="text-lead leading-[1.35] md:col-start-2 md:row-start-1"
      >
        Hi, I’m Jonathan, a {education.status.toLowerCase().replace(" ", "-")} Computer Science student in {profile.school}’s{" "}
        {profile.program}. My interests lie where human–computer interaction meets intelligent systems: UI/UX design,
        computer vision and machine learning. I’m looking for opportunities to grow in all three.
      </p>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:col-start-1 md:row-start-1 md:flex md:w-40 md:flex-col">
        {facts.map(([label, value], i) => (
          <div key={label} data-reveal style={order(i + 1)}>
            <dt className="text-muted">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <p data-reveal className="font-medium md:col-start-1 md:mt-20">
        Courses
      </p>
      <div className="-mt-6 md:col-start-2 md:mt-20">
        <TwoColumns items={education.courses} />
      </div>

      <p data-reveal className="font-medium md:col-start-1 md:mt-10">
        Focus
      </p>
      <div className="-mt-6 md:col-start-2 md:mt-10">
        <TwoColumns items={expertise.map((area) => area.name)} />
      </div>
    </section>
  );
}
