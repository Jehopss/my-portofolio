import { expertise } from "../data/portfolio";

export default function Expertise() {
  return (
    <div className="mt-16 md:mt-20">
      <h3 className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Areas of expertise</h3>
      {/* Columns fill top to bottom, so an odd count never leaves one item alone in a row. */}
      <ul className="mt-5 gap-x-10 border-t border-line sm:columns-2 lg:columns-3">
        {expertise.map(({ name, icon: Icon }) => (
          <li key={name} className="flex break-inside-avoid items-center gap-4 border-b border-line py-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <Icon aria-hidden className="size-[1.15rem]" strokeWidth={1.6} />
            </span>
            <span className="text-[0.95rem] text-fg">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
