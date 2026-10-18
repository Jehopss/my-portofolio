import { Reveal, StaggerList } from "./motion";
import { expertise } from "../data/portfolio";

export default function Expertise() {
  return (
    <div className="mt-16 md:mt-20">
      <Reveal>
        <div className="flex items-baseline justify-between">
          <h3 className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Areas of expertise</h3>
          <span className="text-xs text-muted tabular-nums">{String(expertise.length).padStart(2, "0")}</span>
        </div>
      </Reveal>
      <StaggerList
        className="mt-5 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3"
        itemClassName="border-b border-line"
        step={0.04}
      >
        {expertise.map(({ name, icon: Icon }, i) => (
          <div key={name} className="group flex items-center gap-4 py-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-700 ease-spring group-hover:scale-110 group-hover:-rotate-8">
              <Icon aria-hidden className="size-[1.15rem]" strokeWidth={1.6} />
            </span>
            <span className="text-[0.95rem] text-fg transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
              {name}
            </span>
            <span className="ml-auto pl-3 text-xs text-subtle tabular-nums transition-colors duration-300 group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </StaggerList>
    </div>
  );
}
