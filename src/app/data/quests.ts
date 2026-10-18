import {
  Compass,
  Gamepad2,
  Languages,
  MoonStar,
  ScanFace,
  Send,
  SlidersHorizontal,
  Sparkles,
  Wrench,
  ZoomIn,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Quests: small things to discover on the page. Each one is unlocked */
/*  by the component it names (search the code for its id).            */
/* ------------------------------------------------------------------ */

export type QuestId =
  | "polyglot"
  | "identity"
  | "lights"
  | "explorer"
  | "toolbox"
  | "curator"
  | "close-up"
  | "stargazer"
  | "networker"
  | "cheat-code";

export interface Quest {
  id: QuestId;
  title: string;
  /** Shown while the quest is still locked. */
  hint: string;
  /** Shown once it is unlocked. */
  done: string;
  icon: LucideIcon;
  xp: number;
  /** Steps needed, for quests that count something. */
  goal?: number;
  /** Secret quests keep their title hidden until unlocked. */
  secret?: boolean;
}

/** Hidden stars placed around the page (see HiddenStar). */
export const STAR_COUNT = 5;

export const quests: Quest[] = [
  {
    id: "polyglot",
    title: "Polyglot",
    hint: "The greeting speaks more than one language. Ask it to.",
    done: "Made the greeting switch languages.",
    icon: Languages,
    xp: 100,
  },
  {
    id: "identity",
    title: "Identity confirmed",
    hint: "Run the face match on my photo yourself.",
    done: "Ran the face match. It’s really me.",
    icon: ScanFace,
    xp: 100,
  },
  {
    id: "lights",
    title: "Lights out",
    hint: "Flip the theme switch at the top.",
    done: "Switched the theme.",
    icon: MoonStar,
    xp: 100,
  },
  {
    id: "explorer",
    title: "Explorer",
    hint: "Visit every section of the page.",
    done: "Visited every section.",
    icon: Compass,
    xp: 100,
    goal: 5,
  },
  {
    id: "toolbox",
    title: "Toolbox",
    hint: "Sort my technologies by kind.",
    done: "Filtered the technologies.",
    icon: Wrench,
    xp: 100,
  },
  {
    id: "curator",
    title: "Curator",
    hint: "Show just one kind of project.",
    done: "Filtered the projects.",
    icon: SlidersHorizontal,
    xp: 100,
  },
  {
    id: "close-up",
    title: "Close-up",
    hint: "Open a project’s pictures.",
    done: "Looked at a project up close.",
    icon: ZoomIn,
    xp: 100,
  },
  {
    id: "stargazer",
    title: "Stargazer",
    hint: `${STAR_COUNT} small stars are hiding around the page.`,
    done: `Found all ${STAR_COUNT} hidden stars.`,
    icon: Sparkles,
    xp: 100,
    goal: STAR_COUNT,
  },
  {
    id: "networker",
    title: "Networker",
    hint: "Open one of my profiles, or grab my email.",
    done: "Reached for a way to contact me.",
    icon: Send,
    xp: 100,
  },
  {
    id: "cheat-code",
    title: "Cheat code",
    hint: "Old-school gamers know the code. No keyboard? Knock five times on my name up top.",
    done: "Entered the cheat code. Respect.",
    icon: Gamepad2,
    xp: 200,
    secret: true,
  },
];

export const TOTAL_XP = quests.reduce((sum, quest) => sum + quest.xp, 0);

const ranks = [
  { xp: 0, title: "Visitor" },
  { xp: 200, title: "Wanderer" },
  { xp: 400, title: "Adventurer" },
  { xp: 600, title: "Insider" },
  { xp: 800, title: "Expert" },
  { xp: TOTAL_XP, title: "Legend" },
];

export const xpFor = (done: QuestId[]) =>
  quests.reduce((sum, quest) => sum + (done.includes(quest.id) ? quest.xp : 0), 0);

export function rankFor(xp: number) {
  const level = ranks.findLastIndex((rank) => xp >= rank.xp);
  return { level: level + 1, title: ranks[level].title, next: ranks[level + 1] ?? null };
}

export const questById = (id: QuestId) => quests.find((quest) => quest.id === id) as Quest;
