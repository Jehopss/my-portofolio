"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import { EASE } from "./motion";
import { navItems, socials } from "../data/portfolio";

export default function Header() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Thin reading-progress line along the very top edge.
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  // Scroll-spy: highlight whichever section crosses the middle of the viewport.
  useEffect(() => {
    const sections = ["top", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? "" : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: freeze the page, close on Escape, manage focus.
  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      root.classList.remove("menu-open");
      lenis?.start();
      return;
    }
    root.classList.add("menu-open");
    lenis?.stop();
    firstLink.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const goTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    document.documentElement.classList.remove("menu-open");
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target, { duration: 1.4, force: true });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left bg-accent"
        />
        <div
          className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled || open
              ? "border-line/80 bg-bg/75 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <div className="shell flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
            <a
              href="#top"
              onClick={open ? goTo("top") : undefined}
              className="text-xl leading-none font-semibold tracking-[-0.03em] text-fg"
              aria-label="Jonathan Hopi Pranata — back to top"
            >
              Jonathan<span className="text-accent">.</span>
            </a>

            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-0.5 rounded-full border border-line bg-surface/70 p-1 backdrop-blur-md">
                {navItems.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id} className="relative">
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-accent-soft ring-1 ring-accent/15"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <a
                        href={`#${item.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`relative block rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                          isActive ? "text-accent" : "text-muted hover:text-fg"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-surface/70 text-fg backdrop-blur-md md:hidden"
              >
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={open ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="grid place-items-center"
                  >
                    {open ? (
                      <X aria-hidden className="size-[18px]" strokeWidth={1.75} />
                    ) : (
                      <Menu aria-hidden className="size-[18px]" strokeWidth={1.75} />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 32px)" }}
            animate={{ clipPath: "circle(160% at 92% 32px)" }}
            exit={{ clipPath: "circle(0% at 92% 32px)" }}
            transition={{ duration: 0.75, ease: EASE }}
            className="fixed inset-0 z-40 bg-bg md:hidden"
          >
            <nav aria-label="Mobile" className="shell flex h-full flex-col justify-between pt-28 pb-10">
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.a
                      ref={index === 0 ? firstLink : undefined}
                      href={`#${item.id}`}
                      onClick={goTo(item.id)}
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "105%" }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.12 + index * 0.06 }}
                      className={`flex items-baseline gap-4 py-1 text-[2.6rem] leading-tight font-medium tracking-[-0.04em] ${
                        active === item.id ? "text-accent" : "text-fg"
                      }`}
                    >
                      <span className="text-xs tracking-normal text-muted tabular-nums">0{index + 1}</span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.45 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="flex flex-wrap gap-2"
              >
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted"
                    >
                      <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                      {label}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  </li>
                ))}
              </motion.ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
