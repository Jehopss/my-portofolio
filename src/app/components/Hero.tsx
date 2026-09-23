"use client";

import Image from "next/image";
import { Fragment, useRef, type PointerEvent } from "react";
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
import Greeting from "./Greeting";
import { EASE } from "./motion";
import { profile, socials } from "../data/portfolio";

/** Shared entrance: fade up out of a light blur. */
const intro = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: EASE, delay },
});

/** Portrait card that wipes in, then tilts gently toward the cursor. */
function Portrait() {
  const card = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

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
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface shadow-soft"
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
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glare, opacity: glareOpacity }}
        />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const words = profile.name.split(" ");

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
            <Greeting className="font-serif text-2xl text-muted italic md:text-[1.75rem]" />
          </motion.div>

          <h1 className="mt-3 font-serif text-[clamp(3.25rem,8.6vw,7rem)] leading-[0.98] tracking-[-0.02em] text-balance text-fg">
            {words.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && " "}
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.09 }}
                  >
                    {word}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </h1>

          <motion.p
            {...intro(0.75)}
            className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-muted md:text-xl"
          >
            {profile.summary}
          </motion.p>

          <motion.div {...intro(0.9)} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg pr-5 pl-6 text-sm font-medium text-bg transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-soft"
            >
              View projects
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-medium text-fg transition-colors duration-300 hover:bg-surface"
            >
              Get in touch
            </a>
            <span aria-hidden className="mx-1 hidden h-6 w-px bg-line sm:block" />
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid size-12 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-surface hover:text-fg"
              >
                <Icon aria-hidden className="size-5" strokeWidth={1.6} />
              </a>
            ))}
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
        <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <span className="scroll-cue absolute inset-0 bg-fg/70" />
        </span>
      </motion.a>
    </section>
  );
}
