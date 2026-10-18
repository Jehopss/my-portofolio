"use client";

import { useEffect } from "react";

/**
 * The page's motion layer, all driven from one place:
 * - reveals: [data-reveal], [data-unmask] and .shutter get .is-in once they
 *   enter the viewport (styles in globals.css, only under html.js);
 * - drift: the sheet's columns ([data-drift="speed"]) slide at different
 *   speeds while the hero is on screen.
 * Reduced motion keeps everything still and visible.
 */
export default function Motion() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-unmask], .shutter");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px 12% 0px", threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));

    // Safety net: anything on screen that the observer missed is shown anyway.
    const safety = window.setTimeout(() => {
      targets.forEach((el) => {
        const box = el.getBoundingClientRect();
        if (box.top < innerHeight && box.bottom > 0) el.classList.add("is-in");
      });
    }, 2500);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const columns = Array.from(document.querySelectorAll<HTMLElement>("[data-drift]"));
    let frame = 0;
    const drift = () => {
      frame = 0;
      const y = Math.min(window.scrollY, window.innerHeight * 1.5);
      for (const column of columns) column.style.transform = `translate3d(0, ${-y * Number(column.dataset.drift)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(drift);
    };
    if (!reduce && columns.length) window.addEventListener("scroll", onScroll, { passive: true });

    // Pause the recording while it is off screen.
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]"));
    const vio = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && !reduce) video.play().catch(() => {});
        else video.pause();
      }
    });
    videos.forEach((video) => vio.observe(video));

    return () => {
      io.disconnect();
      vio.disconnect();
      window.clearTimeout(safety);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
