import type { ReactNode } from "react";

function Heading({ id, title }: { id: string; title: string }) {
  return (
    <h2
      id={`${id}-title`}
      className="text-[2.5rem] leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg md:text-5xl"
    >
      {title}
    </h2>
  );
}

/**
 * Editorial section. Default: a sticky title on the left with the content on
 * the right. `wide`: title row on top, content across the full width.
 */
export default function Section({
  id,
  title,
  intro,
  wide = false,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  if (wide) {
    return (
      <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-4 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <Heading id={id} title={title} />
            </div>
            {intro && (
              <p className="max-w-sm text-pretty text-muted md:col-span-4 md:col-start-9 md:pb-1">{intro}</p>
            )}
          </div>
          <div className="mt-12 md:mt-16">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
      <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <Heading id={id} title={title} />
            {intro && <p className="mt-4 max-w-xs text-pretty text-muted">{intro}</p>}
          </div>
        </div>
        <div className="min-w-0 md:col-span-8">{children}</div>
      </div>
    </section>
  );
}
