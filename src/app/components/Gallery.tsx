"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { EASE } from "./motion";

export interface GalleryItem {
  key: string;
  alt: string;
  thumb: StaticImageData;
  full: StaticImageData;
}

/**
 * Full-screen viewer for one project's pictures. The picture that was opened
 * zooms out of its thumbnail (shared layout); after that, pictures slide in
 * from the side they came from. Arrow keys, the buttons or a swipe change
 * picture; Escape, the close button or a tap on the backdrop closes it.
 */
export default function Gallery({
  title,
  items,
  index,
  origin,
  onIndex,
  onClose,
}: {
  title: string;
  items: GalleryItem[];
  index: number;
  /** Index of the thumbnail that opened the viewer, or -1 once the visitor has moved on. */
  origin: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const lenis = useLenis();
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(0);
  const item = items[index];
  const many = items.length > 1;

  const go = useCallback(
    (by: number) => {
      if (!many) return;
      setDirection(by);
      onIndex((index + by + items.length) % items.length);
    },
    [index, items.length, many, onIndex],
  );

  // While open: freeze the page underneath and start keyboard focus on Close.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("menu-open");
    lenis?.stop();
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      root.classList.remove("menu-open");
      lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "Tab" && dialog.current) {
        // Keep Tab inside the viewer.
        const focusable = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
  };

  const shared = index === origin;
  const ratio = item.full.width / item.full.height;

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${title}: pictures`}
      className="fixed inset-0 z-[70] flex flex-col text-[#e2e5e0]"
    >
      <motion.div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-[#0c0f0e]/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />

      <motion.div
        className="relative flex items-center justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <p className="min-w-0 truncate text-sm">
          <span className="font-medium">{title}</span>
          {many && (
            <span className="ml-3 text-[#a3a9a4] tabular-nums">
              {index + 1} / {items.length}
            </span>
          )}
        </p>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15"
        >
          <X aria-hidden className="size-5" strokeWidth={1.75} />
        </button>
      </motion.div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-20">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={item.key}
            layoutId={shared ? `gallery-${item.key}` : undefined}
            custom={direction}
            initial={shared ? false : { opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.5, ease: EASE }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            className="relative max-h-full overflow-hidden rounded-xl bg-[#161a19] shadow-2xl"
            style={{ aspectRatio: `${ratio}`, width: `min(100%, calc((100svh - 11rem) * ${ratio}))` }}
          >
            <Image
              src={item.full}
              alt={item.alt}
              sizes="90vw"
              draggable={false}
              className="pointer-events-none size-full object-contain select-none"
            />
          </motion.div>
        </AnimatePresence>

        {many && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous picture"
              className="absolute left-2 hidden size-11 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15 sm:left-5 sm:grid"
            >
              <ChevronLeft aria-hidden className="size-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next picture"
              className="absolute right-2 hidden size-11 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15 sm:right-5 sm:grid"
            >
              <ChevronRight aria-hidden className="size-5" strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>

      <motion.p
        className="relative mx-auto max-w-2xl px-4 pb-6 text-center text-sm leading-relaxed text-pretty text-[#a3a9a4] sm:pb-8"
        aria-live="polite"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {item.alt}
        {many && <span className="block pt-1 text-xs sm:hidden">Swipe for more</span>}
      </motion.p>
    </div>
  );
}
