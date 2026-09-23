import { expertise } from "../data/portfolio";

/** A slow, endless ribbon of focus areas between the hero and the content. */
export default function Marquee() {
  const items = expertise.map((area) => area.name);
  // Two identical halves: the track slides exactly one half, then loops seamlessly.
  const row = [...items, ...items];

  return (
    <div
      aria-hidden
      className="marquee relative overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:py-6"
    >
      <div className="marquee-track flex w-max">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 pr-8 font-serif text-2xl whitespace-nowrap text-muted italic md:gap-10 md:pr-10 md:text-[2rem]"
          >
            {item}
            <span className="size-1.5 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
