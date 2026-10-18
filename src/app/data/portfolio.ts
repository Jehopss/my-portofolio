/**
 * All of the site's content lives here, so updating the portfolio
 * (new skill, new project, new course) never means touching the layout code.
 */
import type { StaticImageData } from "next/image";

import { frames, type Frame } from "./frames";
import {
  BrainCircuit,
  ChartColumn,
  CodeXml,
  Cpu,
  Database,
  Github,
  Languages,
  Linkedin,
  MessageSquareText,
  Network,
  PenTool,
  Pickaxe,
  ScanEye,
  ShieldCheck,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import biopythonLogo from "../assets/skills/biopython.svg";
import ciscoLogo from "../assets/skills/cisco.svg";
import figmaLogo from "../assets/skills/figma.svg";
import html5Logo from "../assets/skills/html5.svg";
import javaLogo from "../assets/skills/java.svg";
import matplotlibLogo from "../assets/skills/matplotlib.svg";
import mysqlLogo from "../assets/skills/mysql.svg";
import opencvLogo from "../assets/skills/opencv.svg";
import phpLogo from "../assets/skills/php.svg";
import pythonLogo from "../assets/skills/python.svg";
import rstudioLogo from "../assets/skills/rstudio.svg";
import sklearnLogo from "../assets/skills/scikit-learn.svg";
import tailwindLogo from "../assets/skills/tailwindcss.svg";

/* ------------------------------------------------------------------ */
/*  Profile                                                            */
/* ------------------------------------------------------------------ */
export const profile = {
  name: "Jonathan Hopi Pranata",
  role: "Computer Science Student",
  program: "Master Track Program",
  school: "BINUS University",
  summary:
    "Computer Science student in the Master Track Program at BINUS University, exploring the intersection of human–computer interaction and intelligent systems.",
};

export const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "tools", label: "Tools" },
  { id: "contact", label: "Contact" },
] as const;

export const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "GitHub", href: "https://github.com/Jehopss", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jonathan-hopi-pranata/",
    icon: Linkedin,
  },
];

export const contacts = [
  {
    label: "School email",
    value: "jonathan.pranata@binus.ac.id",
    href: "mailto:jonathan.pranata@binus.ac.id",
    copy: "jonathan.pranata@binus.ac.id",
  },
  {
    label: "Personal email",
    value: "jonathanhopee@gmail.com",
    href: "mailto:jonathanhopee@gmail.com",
    copy: "jonathanhopee@gmail.com",
  },
  {
    label: "Phone",
    value: "+62 819-7773-7879",
    href: "tel:+6281977737879",
    copy: "+6281977737879",
  },
];

/* Rotating hero greeting, picked by the visitor's local time. */
export const greetings = {
  morning: [
    "Good Morning!",
    "早安 (Zǎo'ān)!",
    "おはよう (Ohayou)!",
    "Bonjour!",
    "Guten Morgen!",
    "Goedemorgen!",
    "¡Buenos días!",
  ],
  afternoon: [
    "Good Afternoon!",
    "下午好 (Xiàwǔ hǎo)!",
    "こんにちは (Konnichiwa)!",
    "Bon Après-midi!",
    "Guten Tag!",
    "Goedemiddag!",
    "¡Buenas tardes!",
  ],
  evening: [
    "Good Evening!",
    "晚上好 (Wǎnshàng hǎo)!",
    "こんばんは (Konbanwa)!",
    "Bonsoir!",
    "Guten Abend!",
    "Goedenavond!",
    "¡Buenas noches!",
  ],
  night: [
    "Good Night!",
    "晚安 (Wǎn'ān)!",
    "おやすみ (Oyasumi)!",
    "Bonne Nuit!",
    "Gute Nacht!",
    "Welterusten!",
    "¡Buenas noches!",
  ],
};

/* ------------------------------------------------------------------ */
/*  Education                                                          */
/* ------------------------------------------------------------------ */
export const education = {
  school: "BINUS University",
  degree: "Computer Science (Master Track Program)",
  period: "2023 — Present",
  status: "7th Semester",
  courses: [
    "Data Structures",
    "Human Computer Interaction",
    "Database Technology",
    "Artificial Intelligence",
    "Computer Networks",
    "Computational Physics",
    "Object Oriented Programming",
    "Data Mining",
    "Software Engineering",
    "Introduction to Cloud Infrastructure",
    "Machine Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Risk Management & Audit",
    "Intelligent Internet of Things",
  ],
};

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */
export const skillCategories = ["Languages", "Libraries", "Tools"] as const;
export type SkillCategory = (typeof skillCategories)[number];

export interface Skill {
  name: string;
  /** One-line description of what the tool is, shown under its name. */
  kind: string;
  category: SkillCategory;
  /** Official logo (SVG from Devicon / Simple Icons / the project itself). */
  logo?: StaticImageData;
  /** Fallback line icon for tools without a usable official logo. */
  icon?: LucideIcon;
  /** Landscape logos (wordmarks) get a wider box so they don't look tiny. */
  wide?: boolean;
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", kind: "Programming language", category: "Languages", logo: pythonLogo },
  { name: "Java", kind: "Programming language", category: "Languages", logo: javaLogo },
  { name: "PHP", kind: "Server-side language", category: "Languages", logo: phpLogo, wide: true },
  { name: "HTML5", kind: "Markup language", category: "Languages", logo: html5Logo },

  // Libraries & frameworks
  { name: "Matplotlib", kind: "Data visualization", category: "Libraries", logo: matplotlibLogo },
  { name: "scikit-learn", kind: "Machine learning", category: "Libraries", logo: sklearnLogo, wide: true },
  { name: "NLTK", kind: "Natural language processing", category: "Libraries", icon: Languages },
  { name: "OpenCV", kind: "Computer vision (cv2)", category: "Libraries", logo: opencvLogo },
  { name: "Biopython", kind: "Bioinformatics", category: "Libraries", logo: biopythonLogo },
  { name: "Tailwind CSS", kind: "CSS framework", category: "Libraries", logo: tailwindLogo },

  // Tools & platforms
  { name: "MySQL", kind: "Relational database", category: "Tools", logo: mysqlLogo },
  { name: "RStudio", kind: "IDE for R", category: "Tools", logo: rstudioLogo },
  { name: "RapidMiner", kind: "Data science platform", category: "Tools", icon: Workflow },
  { name: "Figma", kind: "Interface design", category: "Tools", logo: figmaLogo },
  { name: "Cisco Packet Tracer", kind: "Network simulation", category: "Tools", logo: ciscoLogo, wide: true },
  { name: "Python Power Electronics", kind: "Circuit simulation", category: "Tools", icon: Zap },
];

export const expertise: { name: string; icon: LucideIcon }[] = [
  { name: "UI/UX Design", icon: PenTool },
  { name: "Database", icon: Database },
  { name: "Data Analysis", icon: ChartColumn },
  { name: "Machine Learning", icon: BrainCircuit },
  { name: "Computer Vision", icon: ScanEye },
  { name: "Natural Language Processing", icon: MessageSquareText },
  { name: "Web Programming", icon: CodeXml },
  { name: "Data Mining", icon: Pickaxe },
  { name: "Computer Networks", icon: Network },
  { name: "Risk Management & Audit", icon: ShieldCheck },
  { name: "Intelligent Internet of Things", icon: Cpu },
];

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */
export type ProjectArea = "Interface design" | "Machine learning";

export interface Project {
  title: string;
  /** Short name for the colour strips, where the full title would be cut off. */
  label?: string;
  /** Three words, shown under the project's strip of frames. */
  kind: string;
  description: string;
  /** Year of the repository's latest commit. */
  year: string;
  areas: ProjectArea[];
  /** One of the five palette colours; it marks this project's frames everywhere. */
  colour: { fill: string; ink: string };
  /** The project's strip in the Work section. */
  frames: Frame[];
  /** Further pictures that appear only on the sheet at the top of the page. */
  moreFrames?: Frame[];
  repo: string;
  figma?: string;
}

// The Coolors palette, one colour per project.
const indigo = { fill: "#16425b", ink: "#d9dcd6" };
const lapis = { fill: "#2f6690", ink: "#ffffff" };
const cerulean = { fill: "#3a7ca5", ink: "#ffffff" };
const sky = { fill: "#81c3d7", ink: "#16425b" };
const platinum = { fill: "#d9dcd6", ink: "#16425b" };

export const projects: Project[] = [
  {
    title: "Finwise",
    kind: "Personal finance manager",
    description: "A personal finance management application that helps you manage your money.",
    year: "2026",
    areas: ["Interface design"],
    colour: indigo,
    frames: [
      frames.fwDashboard,
      frames.fwCategories,
      frames.fwAddCategory,
      frames.fwTransactions,
      frames.fwAddTransaction,
      frames.fwBudgets,
    ],
    moreFrames: [
      frames.fwRecent,
      frames.fwColour,
      frames.fwDate,
      frames.fwBudgetCards,
      frames.fwEditBudget,
      frames.fwChart,
    ],
    repo: "https://github.com/KepinTheNoob/Finwise",
    figma:
      "https://www.figma.com/design/Wd2WWWV3JmNr2bRtlchsj2/Finwise?node-id=0-1&t=vxIEvOYqt8LG0HZf-1",
  },
  {
    title: "Supreme Court Judgement Classification",
    label: "Supreme Court",
    kind: "Case outcome classifier",
    description:
      "A machine learning model that classifies whether a person is guilty based on the facts of the case.",
    year: "2025",
    areas: ["Machine learning"],
    colour: lapis,
    frames: [
      frames.scBalance,
      frames.scWords,
      frames.scCloud,
      frames.scLengths,
      frames.scIssues,
      frames.scVarianceTotal,
    ],
    moreFrames: [frames.scCloudRaw, frames.scBoxplot, frames.scVariance],
    repo: "https://github.com/dheovanwa/Supreme-court-judgement-classification",
  },
  {
    title: "Serenity",
    kind: "Psychological consultation platform",
    description: "A platform for psychological consultation.",
    year: "2025",
    areas: ["Interface design"],
    colour: cerulean,
    frames: [frames.seLake, frames.seLandscape],
    repo: "https://github.com/dheovanwa/Serenity",
    figma:
      "https://www.figma.com/design/0eXmjIK9EGxeDn5FmNOpOR/Serenity?node-id=832-395&t=UZhErHm7G5jZljYc-1",
  },
  {
    title: "NoFake",
    kind: "Fake news detector",
    description:
      "A machine learning model that determines whether a news article is fake or factual.",
    year: "2025",
    areas: ["Machine learning", "Interface design"],
    colour: sky,
    frames: [frames.nfLogo],
    repo: "https://github.com/XQVWMM/NoFake",
    figma:
      "https://www.figma.com/design/cc5QuRPuLykKp3jindjRlE/NoFake?node-id=35-277&t=oliso9qhFY7kycGQ-1",
  },
  {
    title: "DeepPlan",
    kind: "Construction estimate predictor",
    description:
      "An application that uses a machine learning model to predict construction project estimates.",
    year: "2025",
    areas: ["Machine learning", "Interface design"],
    colour: platinum,
    frames: [frames.dpIcon],
    repo: "https://github.com/KepinTheNoob/DeepPlan",
    figma:
      "https://www.figma.com/design/fqqgGGwBSjzptf3UUZCbiI/DeepPlan?node-id=0-1&t=NfPyGB3j8O50SEY6-1",
  },
];

/** Every picture on the sheet at the top of the page, labelled with its project. */
export const sheet: { frame: Frame; label: string; colour: Project["colour"] }[] = [
  { frame: frames.portrait, label: "Jonathan", colour: platinum },
  ...projects.flatMap((project) =>
    [...project.frames, ...(project.moreFrames ?? [])].map((frame) => ({
      frame,
      label: project.label ?? project.title,
      colour: project.colour,
    })),
  ),
];
