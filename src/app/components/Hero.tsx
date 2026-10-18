"use client";

import Image from "next/image";
import { Fragment, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import portrait from "../assets/profile.webp";
import FaceMatch from "./FaceMatch";
import Greeting from "./Greeting";
import Magnetic from "./Magnetic";
import { EASE } from "./motion";
import { profile, socials } from "../data/portfolio";

/** Shared entrance: fade up out of a light blur. */
const intro = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: EASE, delay },
});

/**
 * Portrait card that wipes in, tilts gently toward the cursor and carries a
 * face-match box. Clicking it (or Enter / Space) runs the match again.
 */
function Portrait() {
  const card = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [scan, setScan] = useState(0);
  const rescan = () => setScan((n) => n + 1);
  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    rescan();
  };

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
  const glareX = useTransform(px, [0, 1], [10, 90]);
  const glareY = useTransform(py, [0, 1], [5, 95]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.3), transparent 55%)`;
  const glareOpacity = useSpring(0, { stiffness: 180, damping: 26 });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !card.current) return;
    const rect = card.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
    glareOpacity.set(1);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-[22rem] [perspective:1100px]">
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
      />
      <motion.div
        ref={card}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={rescan}
        onKeyDown={onKey}
        role="button"
        tabIndex={0}
        aria-label="Portrait of Jonathan Hopi Pranata. Press to run the face match again."
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
        className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[2rem] border border-line bg-surface shadow-soft"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.45 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: EASE, delay: 0.45 }}
          >
            <Image
              src={portrait}
              alt="Portrait of Jonathan Hopi Pranata"
              fill
              priority
              sizes="(min-width: 768px) 352px, 100vw"
              className="object-cover dark:brightness-[0.92] dark:saturate-[0.85]"
            />
          </motion.div>
        </motion.div>
        {/* A new key remounts the box, which replays the whole scan. */}
        <FaceMatch key={scan} delay={scan === 0 ? 1.7 : 0.05} />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glare, opacity: glareOpacity }}
        />
      </motion.div>
      <motion.p
        aria-hidden
        className="mt-4 text-center text-xs text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 2.6 }}
      >
        Click the photo to run the face match again
      </motion.p>
    </div>
  );
}

/**
 * The name, split into letters that rise and take the accent colour as the
 * mouse passes over them, strongest under the pointer and fading with distance.
 */
function Name() {
  const heading = useRef<HTMLHeadingElement>(null);
  const frame = useRef(0);
  const reduceMotion = useReducedMotion();
  const words = profile.name.split(" ");

  const letters = () => heading.current?.querySelectorAll<HTMLElement>("[data-letter]") ?? [];

  const onMove = (event: PointerEvent<HTMLHeadingElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      letters().forEach((letter) => {
        const box = letter.getBoundingClientRect();
        const distance = Math.hypot(clientX - (box.left + box.width / 2), clientY - (box.top + box.height / 2));
        const pull = Math.max(0, 1 - distance / 170);
        letter.style.transform = pull ? `translateY(${(-0.13 * pull).toFixed(3)}em)` : "";
        letter.style.color = pull > 0.02 ? `color-mix(in srgb, var(--accent) ${Math.round(pull * 100)}%, var(--fg))` : "";
      });
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    letters().forEach((letter) => {
      letter.style.transform = "";
      letter.style.color = "";
    });
  };

  return (
    <h1
      ref={heading}
      aria-label={profile.name}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="mt-4 text-[clamp(2.9rem,6.8vw,5.9rem)] leading-[1.02] font-medium tracking-[-0.045em] text-balance text-fg"
    >
      {words.map((word, i) => (
        <Fragment key={word}>
          {i > 0 && " "}
          <span aria-hidden className="-mt-[0.16em] -mb-[0.12em] inline-block overflow-hidden pt-[0.16em] pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.09 }}
            >
              {Array.from(word).map((char, j) => (
                <span
                  key={j}
                  data-letter
                  className="inline-block transition-[transform,color] duration-500 ease-out-expo"
                >
                  {char}
                </span>
              ))}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </h1>
  );
}

export default function Hero() {

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Ambient light — two slow-drifting blurred glows. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora absolute -top-32 right-[-45%] size-[26rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-3xl md:-top-48 md:right-[-12%] md:size-[38rem]" />
        <div className="aurora absolute bottom-[-20%] left-[-40%] size-[22rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-60 blur-3xl [animation-delay:-11s] md:bottom-[-25%] md:left-[-18%] md:size-[30rem]" />
      </div>

      <div className="shell grid min-h-[100svh] items-center gap-12 pt-28 pb-24 md:grid-cols-12 md:gap-10 md:pt-32">
        <div className="md:col-span-7">
          <motion.div {...intro(0.2)} className="mb-8 md:hidden">
            <Image
              src={portrait}
              alt=""
              priority
              sizes="80px"
              className="size-20 rounded-full object-cover object-[50%_18%] ring-1 ring-line dark:brightness-[0.92] dark:saturate-[0.85]"
            />
          </motion.div>

          <motion.div {...intro(0.25)}>
            <Greeting className="text-xl text-muted md:text-2xl" />
          </motion.div>

          <Name />

          <motion.p
            {...intro(0.75)}
            className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-muted md:text-xl"
          >
            {profile.summary}
          </motion.p>

          <motion.div {...intro(0.9)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg pr-5 pl-6 text-sm font-medium text-bg transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.97]"
              >
                View projects
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-medium text-fg transition-[background-color,transform] duration-300 hover:bg-surface active:scale-[0.97]"
              >
                Get in touch
              </a>
            </Magnetic>
            {/* Kept in one group so the icons always wrap together on narrow screens. */}
            <div className="flex items-center gap-1">
              <span aria-hidden className="mr-2 ml-1 hidden h-6 w-px bg-line sm:block" />
              {socials.map(({ label, href, icon: Icon }) => (
                <Magnetic key={label} strength={0.45}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid size-12 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-surface hover:text-fg"
                  >
                    <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="hidden md:col-span-5 md:block">
          <Portrait />
        </div>
      </div>

      <motion.a
        href="#about"
        {...intro(1.4)}
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-muted md:flex"
      >
        <span className="text-[0.7rem] font-medium tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <span className="scroll-cue absolute inset-0 bg-fg/70" />
        </span>
      </motion.a>
    </section>
  );
}
