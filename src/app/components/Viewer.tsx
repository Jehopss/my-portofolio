"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Shown = { src: string; alt: string; label: string; width: number; height: number; index: number; total: number };

/**
 * Tap any frame to see it full size. Frames are plain links to the large
 * picture, so without scripts they still open; with scripts they open here,
 * and the arrow keys page through the rest of their group.
 */
export default function Viewer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const group = useRef<HTMLAnchorElement[]>([]);
  const [shown, setShown] = useState<Shown | null>(null);

  const show = useCallback((link: HTMLAnchorElement) => {
    const name = link.dataset.group;
    group.current = Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[data-frame][data-group="${name}"]`)).filter(
      (a) => a.offsetParent !== null,
    );
    const index = Math.max(0, group.current.indexOf(link));
    setShown({
      src: link.href,
      alt: link.dataset.alt ?? "",
      label: link.dataset.label ?? "",
      width: Number(link.dataset.width),
      height: Number(link.dataset.height),
      index,
      total: group.current.length,
    });
    if (!dialog.current?.open) dialog.current?.showModal();
  }, []);

  const step = useCallback(
    (by: number) => {
      if (!shown || group.current.length < 2) return;
      const next = group.current[(shown.index + by + group.current.length) % group.current.length];
      show(next);
    },
    [shown, show],
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[data-frame]");
      if (!link) return;
      event.preventDefault();
      show(link);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [show]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!dialog.current?.open) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <dialog
      ref={dialog}
      aria-label={shown ? `${shown.label}: ${shown.alt}` : "Picture"}
      onClick={(event) => event.target === dialog.current && dialog.current?.close()}
      className="viewer m-auto max-h-none max-w-none border-0 bg-transparent p-0 text-[#d9dcd6]"
    >
      {shown && (
        <figure className="flex max-h-[100svh] w-[min(92vw,1400px)] flex-col gap-3 p-3 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-size file, already sized for the screen */}
          <img
            src={shown.src}
            alt={shown.alt}
            width={shown.width}
            height={shown.height}
            className="mx-auto max-h-[calc(100svh-9rem)] w-auto max-w-full bg-white object-contain"
          />
          <figcaption className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <p className="max-w-[60ch]">
              <span className="font-medium">{shown.label}</span>
              <span className="block text-[var(--step-small)] opacity-80">{shown.alt}</span>
            </p>
            <div className="flex gap-2">
              {shown.total > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="min-h-11 px-3 underline-offset-4 hover:underline">
                    Previous
                  </button>
                  <button type="button" onClick={() => step(1)} className="min-h-11 px-3 underline-offset-4 hover:underline">
                    Next
                  </button>
                </>
              )}
              <button
                type="button"
                autoFocus
                onClick={() => dialog.current?.close()}
                className="min-h-11 bg-[#d9dcd6] px-4 font-medium text-[#16425b] transition-transform active:scale-[0.97]"
              >
                Close
              </button>
            </div>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}
