import type { ReactNode } from "react";

/**
 * One section of the page, drawn like a frame on a Figma canvas: a white
 * panel with its name in small grey type just above the top-left corner.
 * The "#" is Figma's frame glyph and, here, also the section's anchor.
 */
export default function Frame({
  id,
  name,
  children,
  className = "",
}: {
  id: string;
  name: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-name`} className="scroll-mt-20">
      <h2 id={`${id}-name`} className="mb-2 flex items-center gap-1.5 text-[0.8125rem] leading-none text-muted">
        <span aria-hidden className="text-rule-strong">
          #
        </span>
        {name}
      </h2>
      <div className={`bg-frame px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 ${className}`}>{children}</div>
    </section>
  );
}
