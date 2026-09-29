"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * A list item that looks selected on hover or keyboard focus, like a frame in
 * Figma: blue outline, four handles and a chip with its size in pixels,
 * measured the moment it is selected. Styles live in globals.css (.sel*).
 */
export default function Selectable({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const [size, setSize] = useState("");

  const measure = () => {
    const box = ref.current?.getBoundingClientRect();
    if (box) setSize(`${Math.round(box.width)} × ${Math.round(box.height)}`);
  };

  return (
    <li ref={ref} onPointerEnter={measure} onFocus={measure} className={`sel ${className}`}>
      {children}
      <span aria-hidden className="sel-box">
        <span className="sel-handle" />
        <span className="sel-handle" />
        <span className="sel-handle" />
        <span className="sel-handle" />
        <span className="sel-size machine">{size}</span>
      </span>
    </li>
  );
}
