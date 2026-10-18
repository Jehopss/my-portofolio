"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { navItems } from "../data/portfolio";
import { quests, STAR_COUNT, type QuestId } from "../data/quests";

const STORAGE_KEY = "quest-progress";
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export interface Progress {
  done: QuestId[];
  /** Hidden stars collected, by id. */
  stars: string[];
  /** Sections visited, by id. */
  seen: string[];
  /** Whether the visitor has seen (or dismissed) the "this page is a game" hint. */
  intro: boolean;
}

type NoticeBody = { kind: "quest"; id: QuestId } | { kind: "star"; found: number } | { kind: "complete" };
export type Notice = NoticeBody & { key: number };

interface QuestApi {
  /** False until saved progress has been read from the browser. */
  ready: boolean;
  progress: Progress;
  notices: Notice[];
  unlock: (id: QuestId) => void;
  findStar: (id: string) => void;
  dismiss: (key: number) => void;
  dismissIntro: () => void;
  reset: () => void;
}

const empty: Progress = { done: [], stars: [], seen: [], intro: false };
const noop = () => {};
const QuestContext = createContext<QuestApi>({
  ready: false,
  progress: empty,
  notices: [],
  unlock: noop,
  findStar: noop,
  dismiss: noop,
  dismissIntro: noop,
  reset: noop,
});

export const useQuest = () => useContext(QuestContext);

const strings = (value: unknown) => (Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []);

function load(): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!saved || typeof saved !== "object") return empty;
    const ids = quests.map((quest) => quest.id as string);
    return {
      done: strings(saved.done).filter((id): id is QuestId => ids.includes(id)),
      stars: strings(saved.stars),
      seen: strings(saved.seen),
      intro: Boolean(saved.intro),
    };
  } catch {
    return empty;
  }
}

/**
 * Keeps the visitor's quest progress (saved in their browser), hands out
 * achievements, and queues the notices QuestHud shows for them. Also listens
 * for the two quests no single component owns: visiting every section, and
 * the Konami code.
 */
export default function QuestProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<Progress>(empty);
  const [notices, setNotices] = useState<Notice[]>([]);
  // The latest progress, readable from event handlers without waiting for a render.
  const current = useRef<Progress>(empty);
  const lastKey = useRef(0);

  const commit = useCallback((next: Progress) => {
    current.current = next;
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* private mode — progress just won't survive a reload */
    }
  }, []);

  const notify = useCallback((body: NoticeBody) => {
    lastKey.current += 1;
    const notice = { ...body, key: lastKey.current };
    // Only the newest few are worth showing; older ones are dropped rather than queued.
    setNotices((list) => [...list, notice].slice(-3));
  }, []);

  const unlock = useCallback(
    (id: QuestId) => {
      const now = current.current;
      if (now.done.includes(id)) return;
      const done = [...now.done, id];
      commit({ ...now, done });
      notify({ kind: "quest", id });
      if (done.length === quests.length) notify({ kind: "complete" });
    },
    [commit, notify],
  );

  const findStar = useCallback(
    (id: string) => {
      const now = current.current;
      if (now.stars.includes(id)) return;
      const stars = [...now.stars, id];
      commit({ ...now, stars });
      notify({ kind: "star", found: stars.length });
      if (stars.length >= STAR_COUNT) unlock("stargazer");
    },
    [commit, notify, unlock],
  );

  const dismiss = useCallback((key: number) => setNotices((list) => list.filter((n) => n.key !== key)), []);
  const dismissIntro = useCallback(() => commit({ ...current.current, intro: true }), [commit]);
  const reset = useCallback(() => {
    setNotices([]);
    commit({ ...empty, intro: true });
  }, [commit]);

  useEffect(() => {
    const saved = load();
    current.current = saved;
    setProgress(saved);
    setReady(true);
  }, []);

  // Explorer: a section counts as visited once it crosses the middle of the screen.
  useEffect(() => {
    const ids: string[] = navItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const now = current.current;
          if (!entry.isIntersecting || now.seen.includes(entry.target.id)) continue;
          const seen = [...now.seen, entry.target.id];
          commit({ ...now, seen });
          if (ids.every((id) => seen.includes(id))) unlock("explorer");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [commit, unlock]);

  // Cheat code: ↑ ↑ ↓ ↓ ← → ← → B A.
  useEffect(() => {
    let step = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      step = key === KONAMI[step] ? step + 1 : key === KONAMI[0] ? 1 : 0;
      if (step === KONAMI.length) {
        step = 0;
        unlock("cheat-code");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock]);

  const api = useMemo(
    () => ({ ready, progress, notices, unlock, findStar, dismiss, dismissIntro, reset }),
    [ready, progress, notices, unlock, findStar, dismiss, dismissIntro, reset],
  );

  return <QuestContext.Provider value={api}>{children}</QuestContext.Provider>;
}
