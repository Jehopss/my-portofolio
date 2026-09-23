import type { ReactNode } from "react";
import { Reveal } from "./motion";

function Heading({ id, index, title }: { id: string; index: string; title: string }) {
  return (
    <>
      <p className="font-mono text-xs tracking-[0.2em] text-accent">{index}</p>
      <h2
        id={`${id}-title`}
        className="mt-3 font-serif text-[2.75rem] leading-none tracking-[-0.01em] text-fg md:text-[3.25rem]"
      >
        {title}
      </h2>
    </>
  );
}

/**
 * Editorial section. Default: a sticky numbered title on the left with the
 * content on the right. `wide`: title row on top, content across the full width.
 */
export default function Section({
  id,
  index,
  title,
  intro,
  wide = false,
  children,
}: {
  id: string;
  index: string;
  title: string;
  intro?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  if (wide) {
    return (
      <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
        <div className="shell">
          <Reveal className="grid gap-5 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <Heading id={id} index={index} title={title} />
            </div>
            {intro && (
              <p className="max-w-sm text-pretty text-muted md:col-span-4 md:col-start-9 md:pb-1">{intro}</p>
            )}
          </Reveal>
          <div className="mt-12 md:mt-16">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
      <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Reveal className="md:sticky md:top-32">
            <Heading id={id} index={index} title={title} />
            {intro && <p className="mt-4 max-w-xs text-pretty text-muted">{intro}</p>}
          </Reveal>
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}
