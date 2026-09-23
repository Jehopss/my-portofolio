/**
 * All of the site's content lives here, so updating the portfolio
 * (new skill, new project, new course) never means touching the layout code.
 */
import type { StaticImageData } from "next/image";
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
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
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
    value: "+62 812-9817-3899",
    href: "tel:+6281298173899",
    copy: "+6281298173899",
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
  status: "5th Semester",
  courses: [
    "Human Computer Interaction",
    "Machine Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Data Mining",
    "Software Engineering",
    "Artificial Intelligence",
    "Database Technology",
    "Introduction to Cloud Infrastructure",
    "Data Structures",
    "Object Oriented Programming",
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
  /** Brand tint used for the hover glow. Defaults to the site accent. */
  color?: string;
  /** Landscape logos (wordmarks) get a wider box so they don't look tiny. */
  wide?: boolean;
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", kind: "Programming language", category: "Languages", logo: pythonLogo, color: "#3776ab" },
  { name: "Java", kind: "Programming language", category: "Languages", logo: javaLogo, color: "#e76f00" },
  { name: "PHP", kind: "Server-side language", category: "Languages", logo: phpLogo, color: "#777bb4", wide: true },
  { name: "HTML5", kind: "Markup language", category: "Languages", logo: html5Logo, color: "#e34f26" },

  // Libraries & frameworks
  { name: "Matplotlib", kind: "Data visualization", category: "Libraries", logo: matplotlibLogo, color: "#11557c" },
  { name: "scikit-learn", kind: "Machine learning", category: "Libraries", logo: sklearnLogo, color: "#f7931e", wide: true },
  { name: "NLTK", kind: "Natural language processing", category: "Libraries", icon: Languages },
  { name: "OpenCV", kind: "Computer vision (cv2)", category: "Libraries", logo: opencvLogo, color: "#5c3ee8" },
  { name: "Biopython", kind: "Bioinformatics", category: "Libraries", logo: biopythonLogo, color: "#37709f" },
  { name: "Tailwind CSS", kind: "CSS framework", category: "Libraries", logo: tailwindLogo, color: "#06b6d4" },

  // Tools & platforms
  { name: "MySQL", kind: "Relational database", category: "Tools", logo: mysqlLogo, color: "#00758f" },
  { name: "RStudio", kind: "IDE for R", category: "Tools", logo: rstudioLogo, color: "#75aadb" },
  { name: "RapidMiner", kind: "Data science platform", category: "Tools", icon: Workflow },
  { name: "Figma", kind: "Interface design", category: "Tools", logo: figmaLogo, color: "#a259ff" },
  { name: "Cisco Packet Tracer", kind: "Network simulation", category: "Tools", logo: ciscoLogo, color: "#1ba0d7", wide: true },
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
export interface Project {
  title: string;
  description: string;
  repo: string;
  figma?: string;
}

export const projects: Project[] = [
  {
    title: "Serenity",
    description: "A platform for psychological consultation.",
    repo: "https://github.com/dheovanwa/Serenity",
    figma:
      "https://www.figma.com/design/0eXmjIK9EGxeDn5FmNOpOR/Serenity?node-id=832-395&t=UZhErHm7G5jZljYc-1",
  },
  {
    title: "DeepPlan",
    description:
      "An application that uses a machine learning model to predict construction project estimates.",
    repo: "https://github.com/KepinTheNoob/DeepPlan",
    figma:
      "https://www.figma.com/design/fqqgGGwBSjzptf3UUZCbiI/DeepPlan?node-id=0-1&t=NfPyGB3j8O50SEY6-1",
  },
  {
    title: "Finwise",
    description: "A personal finance management application that helps you manage your money.",
    repo: "https://github.com/KepinTheNoob/Finwise",
    figma:
      "https://www.figma.com/design/Wd2WWWV3JmNr2bRtlchsj2/Finwise?node-id=0-1&t=vxIEvOYqt8LG0HZf-1",
  },
  {
    title: "NoFake",
    description:
      "A machine learning model that determines whether a news article is fake or factual.",
    repo: "https://github.com/XQVWMM/NoFake",
    figma:
      "https://www.figma.com/design/cc5QuRPuLykKp3jindjRlE/NoFake?node-id=35-277&t=oliso9qhFY7kycGQ-1",
  },
  {
    title: "Supreme Court Judgement Classification",
    description:
      "A machine learning model that classifies whether a person is guilty based on the facts of the case.",
    repo: "https://github.com/dheovanwa/Supreme-court-judgement-classification",
  },
];
