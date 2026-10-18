import Image from "next/image";
import type { CSSProperties } from "react";

import type { Frame as FrameData } from "../data/frames";

/**
 * One picture on the contact sheet. It links to the large version, so it
 * works without scripts; Viewer.tsx opens that link in place instead.
 */
export default function Frame({
  frame,
  group,
  label,
  colour,
  height,
  className = "",
  priority = false,
  style,
}: {
  frame: FrameData;
  /** Frames in the same group page through together in the viewer. */
  group: string;
  /** Project name, printed on the colour strip and in the viewer. */
  label: string;
  colour?: { fill: string; ink: string };
  /** Fixed rendered height in px (strips); omit to fill the width (sheet columns). */
  height?: number;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  const ratio = frame.thumb.width / frame.thumb.height;

  return (
    <a
      href={frame.full.src}
      data-frame
      data-group={group}
      data-label={label}
      data-alt={frame.alt}
      data-width={frame.full.width}
      data-height={frame.full.height}
      className={`frame ${className}`}
      style={style}
    >
      <Image
        src={frame.thumb}
        alt={frame.alt}
        priority={priority}
        sizes={height ? `${Math.round(height * ratio)}px` : "(min-width: 48rem) 16vw, 50vw"}
        style={height ? { height, width: "auto" } : { width: "100%", height: "auto" }}
      />
      {colour && (
        <span
          className="strip"
          style={{ "--strip": colour.fill, "--strip-ink": colour.ink } as CSSProperties}
        >
          {label}
        </span>
      )}
    </a>
  );
}
