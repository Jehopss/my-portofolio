"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import portrait from "../assets/profile.webp";

/** Working resolution of the machine passes. Upscaled with hard pixels on screen. */
const W = 220;
const H = 275;

type Stage = "photo" | "gray" | "edges" | "dither";

const STAGES: { id: Stage; label: string; note: string }[] = [
  { id: "photo", label: "Photo", note: `Input · ${portrait.width} × ${portrait.height} px · RGB` },
  { id: "gray", label: "Grayscale", note: "Luma · Y = 0.299R + 0.587G + 0.114B" },
  { id: "edges", label: "Edges", note: "Sobel · 3 × 3 kernels · gradient magnitude" },
  { id: "dither", label: "Dither", note: `Atkinson · 1-bit · ${W} × ${H} px` },
];

/**
 * Where the face sits in profile.webp, as fractions of the photo. Update these
 * if the photo changes.
 */
const FACE = { left: "25%", top: "16.5%", width: "49.5%", height: "49%" };

/* ------------------------------------------------------------------ */
/*  The passes. Each returns one 0–255 value per pixel.                */
/* ------------------------------------------------------------------ */

/** Rec. 601 luma, with a gentle curve so the midtones hold up once dithered. */
function toLuma(rgba: Uint8ClampedArray) {
  const out = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const y = 0.299 * rgba[i * 4] + 0.587 * rgba[i * 4 + 1] + 0.114 * rgba[i * 4 + 2];
    const x = Math.pow(y / 255, 0.95);
    out[i] = Math.min(255, Math.max(0, ((x - 0.5) * 1.2 + 0.5) * 255));
  }
  return out;
}

/** Sobel operator: gradient magnitude, drawn dark-on-light like pencil. */
function sobel(luma: Float32Array) {
  const out = new Uint8ClampedArray(W * H);
  const at = (x: number, y: number) =>
    luma[Math.min(H - 1, Math.max(0, y)) * W + Math.min(W - 1, Math.max(0, x))];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const gx =
        -at(x - 1, y - 1) - 2 * at(x - 1, y) - at(x - 1, y + 1) + at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1);
      const gy =
        -at(x - 1, y - 1) - 2 * at(x, y - 1) - at(x + 1, y - 1) + at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1);
      out[y * W + x] = 255 - Math.min(255, Math.hypot(gx, gy) * 0.9);
    }
  }
  return out;
}

/** Atkinson dithering: 1 bit per pixel, 6/8 of the error spread to six neighbours. */
function atkinson(luma: Float32Array) {
  const buf = Float32Array.from(luma);
  const out = new Uint8ClampedArray(W * H);
  const spread = [
    [1, 0],
    [2, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [0, 2],
  ];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const value = buf[i] < 128 ? 0 : 255;
      const error = (buf[i] - value) / 8;
      out[i] = value;
      for (const [dx, dy] of spread) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < W && ny < H) buf[ny * W + nx] += error;
      }
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */

function hexToRgb(value: string) {
  const hex = value.trim().replace("#", "");
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, "$&$&") : hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Paint one pass as RGBA, mixing the theme's dark and light pixel colours. */
function paint(values: Uint8ClampedArray | null, on: number[], off: number[]) {
  const img = new ImageData(W, H);
  if (!values) return img; // Photo: transparent, the <img> underneath shows through.
  for (let i = 0; i < W * H; i++) {
    const t = values[i] / 255;
    img.data[i * 4] = on[0] + (off[0] - on[0]) * t;
    img.data[i * 4 + 1] = on[1] + (off[1] - on[1]) * t;
    img.data[i * 4 + 2] = on[2] + (off[2] - on[2]) * t;
    img.data[i * 4 + 3] = 255;
  }
  return img;
}

/**
 * The portrait, run through a small image-processing pipeline in the browser.
 * On load a scanline sweeps down and dithers the photo row by row (the order
 * Atkinson's error diffusion actually works in), then a detection box locks on.
 */
export default function PortraitPipeline() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const passes = useRef<Record<Stage, Uint8ClampedArray | null> | null>(null);
  const shown = useRef<ImageData | null>(null);
  const frame = useRef(0);
  const [stage, setStage] = useState<Stage>("photo");
  const [ready, setReady] = useState(false);
  const [locked, setLocked] = useState(false);
  const stageRef = useRef(stage);
  stageRef.current = stage;

  /** Sweep from whatever is on screen to `next`, top to bottom. */
  const sweep = useCallback((next: Stage, duration: number, onDone?: () => void) => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx || !passes.current) return;

    const styles = getComputedStyle(canvas.current!);
    const target = paint(
      passes.current[next],
      hexToRgb(styles.getPropertyValue("--px-on")),
      hexToRgb(styles.getPropertyValue("--px-off")),
    );
    const from = shown.current ?? new ImageData(W, H);
    const signal = styles.getPropertyValue("--signal").trim();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const step = (now: number) => {
      // rAF timestamps can precede `start` slightly, so clamp to 0–1.
      const t = reduce || duration === 0 ? 1 : Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      const row = Math.round(eased * H);
      const mix = new ImageData(W, H);
      mix.data.set(target.data.subarray(0, row * W * 4));
      mix.data.set(from.data.subarray(row * W * 4), row * W * 4);
      ctx.putImageData(mix, 0, 0);
      if (t < 1) {
        ctx.fillStyle = signal;
        ctx.fillRect(0, row, W, 1);
        frame.current = requestAnimationFrame(step);
      } else {
        shown.current = target;
        onDone?.();
      }
    };
    frame.current = requestAnimationFrame(step);
  }, []);

  // Load the photo once, compute every pass, then run the opening sweep.
  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.src = portrait.src;
    img
      .decode()
      .then(() => {
        if (cancelled) return;
        const scratch = document.createElement("canvas");
        scratch.width = W;
        scratch.height = H;
        const sctx = scratch.getContext("2d", { willReadFrequently: true });
        if (!sctx) return;
        // Cover-crop to 4:5, the same framing as object-cover on the <img>.
        const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
        const sw = W / scale;
        const sh = H / scale;
        sctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, W, H);

        const luma = toLuma(sctx.getImageData(0, 0, W, H).data);
        passes.current = {
          photo: null,
          gray: Uint8ClampedArray.from(luma),
          edges: sobel(luma),
          dither: atkinson(luma),
        };
        setReady(true);
        setStage("dither");
        sweep("dither", 1600, () => setLocked(true));
      })
      .catch(() => {
        /* The plain photo stays on screen. */
      });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame.current);
    };
  }, [sweep]);

  // Repaint in the new colours when the theme changes.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (passes.current) {
        shown.current = null;
        sweep(stageRef.current, 0);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, [sweep]);

  const choose = (next: Stage) => {
    if (next === stage || !ready) return;
    setStage(next);
    sweep(next, 650);
  };

  const note = STAGES.find((s) => s.id === stage)!.note;

  return (
    <figure data-locked={locked ? "" : undefined} className="w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-rule bg-frame">
        <Image
          src={portrait}
          alt="Portrait of Jonathan Hopi Pranata"
          fill
          priority
          sizes="(min-width: 1024px) 440px, 100vw"
          className="object-cover"
        />
        <canvas
          ref={canvas}
          width={W}
          height={H}
          aria-hidden
          className="pixelated absolute inset-0 size-full"
        />
        <div aria-hidden style={FACE} className="detect pointer-events-none absolute">
          <span className="absolute inset-0 border border-signal" />
          <span className="machine absolute bottom-full left-[-1px] flex items-center gap-2 bg-signal px-1.5 pt-1 pb-0.5 text-[0.875rem] leading-none text-signal-fg">
            jonathan <span className="opacity-75">0.98</span>
          </span>
        </div>
      </div>

      <figcaption className="mt-3">
        <div role="group" aria-label="Image-processing pass" className="grid grid-cols-4 border border-rule-strong">
          {STAGES.map((s) => {
            const selected = s.id === stage;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={selected}
                disabled={!ready}
                onClick={() => choose(s.id)}
                className={`border-l border-rule-strong px-1 py-2 text-[0.8125rem] transition-colors first:border-l-0 disabled:cursor-wait ${
                  selected ? "bg-ink text-frame" : "text-muted hover:bg-signal-soft hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <p className="machine mt-2.5 text-[0.875rem] leading-snug text-muted" aria-live="polite">
          {note}
        </p>
      </figcaption>
    </figure>
  );
}
