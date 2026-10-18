"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Crown, Lock, RotateCcw, Sparkle, Trophy, X, type LucideIcon } from "lucide-react";

import { burst } from "./confetti";
import { EASE } from "./motion";
import { useQuest, type Notice } from "./QuestProvider";
import { contacts } from "../data/portfolio";
import { questById, quests, rankFor, STAR_COUNT, TOTAL_XP, xpFor } from "../data/quests";

const email = contacts.find((contact) => contact.label === "Personal email") ?? contacts[0];

/** Progress ring around the trophy on the HUD button. */
function Ring({ value, complete }: { value: number; complete: boolean }) {
  const radius = 17;
  const length = 2 * Math.PI * radius;
  const Icon = complete ? Crown : Trophy;
  return (
    <span className="relative grid size-10 place-items-center">
      <svg aria-hidden viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
        <circle cx="20" cy="20" r={radius} fill="none" strokeWidth="2.5" className="stroke-line" />
        <motion.circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={length}
          className="stroke-accent"
          initial={false}
          animate={{ strokeDashoffset: length * (1 - value) }}
          transition={{ type: "spring", stiffness: 110, damping: 20 }}
        />
      </svg>
      <Icon aria-hidden className="size-4 text-accent" strokeWidth={1.9} />
    </span>
  );
}

function noticeContent(notice: Notice): { icon: LucideIcon; label: string; title: string; xp?: number } {
  if (notice.kind === "star") {
    return { icon: Sparkle, label: "Hidden star", title: `${notice.found} of ${STAR_COUNT} found` };
  }
  if (notice.kind === "complete") {
    return { icon: Crown, label: "Every quest complete", title: "Legend status unlocked" };
  }
  const quest = questById(notice.id);
  return { icon: quest.icon, label: "Achievement unlocked", title: quest.title, xp: quest.xp };
}

/** One "Achievement unlocked" pill. It throws a little confetti and leaves by itself. */
function Toast({ notice, onDone }: { notice: Notice; onDone: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const { icon: Icon, label, title, xp } = noticeContent(notice);

  useEffect(() => {
    const rect = box.current?.getBoundingClientRect();
    if (notice.kind === "complete") {
      burst(0, window.innerHeight, { count: 120, power: 17, angle: -Math.PI / 3, spread: Math.PI / 4 });
      burst(window.innerWidth, window.innerHeight, { count: 120, power: 17, angle: (-2 * Math.PI) / 3, spread: Math.PI / 4 });
    } else if (notice.kind === "quest" && rect) {
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, { count: 36, power: 7 });
    }
    const timer = window.setTimeout(onDone, notice.kind === "complete" ? 6000 : 3800);
    return () => window.clearTimeout(timer);
    // Runs once per notice; onDone is a fresh closure on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={box}
      layout
      initial={{ opacity: 0, y: -24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="flex items-center gap-3 rounded-full border border-line bg-surface/95 py-2 pr-5 pl-2 shadow-soft backdrop-blur-xl"
    >
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-full ${
          notice.kind === "star" ? "bg-accent-soft text-accent" : "bg-accent text-accent-fg"
        }`}
      >
        <Icon aria-hidden className="size-[1.1rem]" strokeWidth={1.8} />
      </span>
      <span className="leading-tight">
        <span className="block text-[0.65rem] font-medium tracking-[0.14em] text-muted uppercase">{label}</span>
        <span className="block text-sm font-medium text-fg">
          {title}
          {xp ? <span className="ml-1.5 text-accent tabular-nums">+{xp} XP</span> : null}
        </span>
      </span>
    </motion.div>
  );
}

/**
 * The game layer: a trophy button in the corner showing how many quests are
 * done, the quest log it opens, a one-time hint that the page is a game, and
 * the toasts announcing each unlock.
 */
export default function QuestHud() {
  const { ready, progress, notices, dismiss, dismissIntro, reset } = useQuest();
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const count = progress.done.length;
  const total = quests.length;
  const latest = notices.findLast((notice) => notice.kind === "quest");
  const complete = count === total;
  const xp = xpFor(progress.done);
  const rank = rankFor(xp);

  // First visit only: point out the game a few seconds after the page settles.
  useEffect(() => {
    if (!ready || progress.intro || count > 0) {
      setHint(false);
      return;
    }
    const timer = window.setTimeout(() => setHint(true), 4500);
    return () => window.clearTimeout(timer);
  }, [ready, progress.intro, count]);

  // While the log is open: Escape or a click elsewhere closes it.
  useEffect(() => {
    if (!open) {
      setConfirmReset(false);
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const toggle = () => {
    setOpen((value) => !value);
    if (!progress.intro) dismissIntro();
  };

  const stepsFor = (id: string) =>
    id === "explorer" ? progress.seen.length : id === "stargazer" ? progress.stars.length : null;

  return (
    <>
      {/* Toasts sit just under the header, above everything but the cursor. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-20 z-[75] flex flex-col items-center gap-2 px-4 md:top-24"
      >
        <AnimatePresence initial={false}>
          {notices.map((notice) => (
            <Toast key={notice.key} notice={notice} onDone={() => dismiss(notice.key)} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {hint && !open && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed right-4 bottom-20 z-[36] w-64 origin-bottom-right rounded-2xl border border-line bg-surface p-4 pr-10 shadow-soft sm:right-6 sm:bottom-[5.5rem]"
          >
            <p className="text-sm font-medium text-fg">Psst. This page is a game.</p>
            <p className="mt-1 text-sm leading-snug text-muted">
              {total} things to discover. Open the quest log to see what they are.
            </p>
            <button
              type="button"
              onClick={dismissIntro}
              aria-label="Dismiss"
              className="absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <X aria-hidden className="size-4" strokeWidth={1.75} />
            </button>
            <span
              aria-hidden
              className="absolute right-7 -bottom-[7px] size-3 rotate-45 border-r border-b border-line bg-surface"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id={panelId}
            key="log"
            role="dialog"
            aria-label="Quest log"
            data-lenis-prevent
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-x-3 bottom-20 z-[36] max-h-[calc(100svh-10.5rem)] origin-bottom-right overflow-y-auto overscroll-contain rounded-3xl border border-line bg-surface/95 shadow-soft backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:bottom-[5.5rem] sm:max-h-[calc(100svh-11.5rem)] sm:w-[23rem]"
          >
            <div className="border-b border-line p-5 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Quest log</p>
                  <p className="mt-1 text-xl font-medium tracking-tight text-fg">
                    Lv {rank.level} · {rank.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    button.current?.focus();
                  }}
                  aria-label="Close quest log"
                  className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
                >
                  <X aria-hidden className="size-4" strokeWidth={1.75} />
                </button>
              </div>
              <div className="mt-4 flex justify-between text-xs text-muted tabular-nums">
                <span>
                  {xp} / {TOTAL_XP} XP
                </span>
                <span>{rank.next ? `${rank.next.xp - xp} XP to ${rank.next.title}` : "Max level"}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="h-full origin-left rounded-full bg-accent"
                  initial={false}
                  animate={{ scaleX: xp / TOTAL_XP }}
                  transition={{ type: "spring", stiffness: 110, damping: 20 }}
                />
              </div>
            </div>

            {complete && (
              <div className="mx-4 mt-4 rounded-2xl bg-accent p-4 text-accent-fg">
                <p className="font-medium">You found everything.</p>
                <p className="mt-1 text-sm leading-snug opacity-85">
                  Thanks for exploring this far. If you liked what you saw, let’s talk.
                </p>
                <a
                  href={email.href}
                  className="mt-3 inline-flex h-9 items-center rounded-full bg-accent-fg px-4 text-sm font-medium text-accent transition-transform active:scale-[0.97]"
                >
                  Email me
                </a>
              </div>
            )}

            <ul className="p-2">
              {quests.map((quest) => {
                const done = progress.done.includes(quest.id);
                const hidden = quest.secret && !done;
                const Icon = hidden ? Lock : quest.icon;
                const steps = stepsFor(quest.id);
                return (
                  <li key={quest.id} className="flex items-center gap-3 rounded-2xl px-3 py-2.5">
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${
                        done ? "bg-accent text-accent-fg" : "border border-dashed border-line-strong text-subtle"
                      }`}
                    >
                      <Icon aria-hidden className="size-[1.1rem]" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-medium ${done ? "text-fg" : "text-muted"}`}>
                        {hidden ? "Secret quest" : quest.title}
                      </span>
                      <span className="block text-xs leading-snug text-pretty text-muted">
                        {done ? quest.done : quest.hint}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-muted tabular-nums">
                      {done ? (
                        <Check aria-label="Done" className="size-4 text-accent" strokeWidth={2.25} />
                      ) : steps !== null ? (
                        `${steps}/${quest.goal}`
                      ) : (
                        `+${quest.xp}`
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 text-xs text-muted">
              <span>Saved in this browser.</span>
              <button
                type="button"
                onClick={() => {
                  if (!confirmReset) return setConfirmReset(true);
                  reset();
                  setConfirmReset(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:text-fg"
              >
                <RotateCcw aria-hidden className="size-3.5" strokeWidth={1.75} />
                {confirmReset ? "Sure? Click again" : "Start over"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={button}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`Quest log: ${count} of ${total} achievements unlocked`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.6 }}
        className="fixed right-4 bottom-4 z-[36] flex h-12 items-center gap-2 rounded-full border border-line bg-surface/85 pr-4 pl-1 shadow-soft backdrop-blur-xl transition-[border-color] duration-300 hover:border-accent/50 active:scale-[0.97] sm:right-6 sm:bottom-6"
      >
        <span className="relative">
          <Ring value={count / total} complete={complete} />
          {/* A ping each time a quest is unlocked. */}
          {latest && (
            <motion.span
              key={latest.key}
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-accent"
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: 1.9, opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          )}
        </span>
        <span className="text-left leading-tight">
          <span className="hidden text-[0.7rem] text-muted sm:block">
            Lv {rank.level} · {rank.title}
          </span>
          <span className="block text-sm font-medium text-fg tabular-nums">
            {count}/{total}
            <span className="hidden sm:inline"> quests</span>
          </span>
        </span>
      </motion.button>
    </>
  );
}
