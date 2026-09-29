# Jonathan Hopi Pranata — Portfolio

Personal portfolio built with [Next.js](https://nextjs.org) (static export) and Tailwind CSS v4.
Deployed to GitHub Pages by `.github/workflows/nextjs.yml` on every push to `main`.

Live: https://jehopss.github.io/my-portofolio/

## The idea

Jonathan works where people meet intelligent systems, so the page is drawn in two voices:

- **Human:** a designer's canvas. Every section is a white frame on a grey canvas, named the
  way Figma names frames (`# About`). Hovering a project selects it like a Figma frame, with
  corner handles and its live size in pixels.
- **Machine:** the portrait runs through a small image-processing pipeline in the browser
  (grayscale, Sobel edges, Atkinson dithering) and a detection box locks onto the face.
  Machine labels are set in the dot-matrix face Doto.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into ./out
```

## Editing content

All text lives in **`src/app/data/portfolio.ts`**: profile, contacts, courses, skills,
areas of expertise and projects. Add an item to the right array and the layout picks it up.

- **New skill:** drop an SVG logo into `src/app/assets/skills/`, import it at the top of
  `portfolio.ts`, then add `{ name, kind, category, logo }` to `skills`.
  No official logo? Use a [Lucide](https://lucide.dev/icons) icon via `icon` instead.
  The grid is 4 columns wide, so multiples of 4 fill it evenly.
- **New project:** add `{ title, description, areas, repo, figma? }` to `projects`.
- **New photo:** replace `src/app/assets/profile.webp` (4:5 works best), then move the
  `FACE` box in `src/app/components/PortraitPipeline.tsx` so it sits on the face again.

## Structure

```
src/app/
├─ page.tsx            # frame order
├─ layout.tsx          # fonts, metadata, theme bootstrapping
├─ globals.css         # colour tokens (light + dark), type roles, selection styles
├─ data/portfolio.ts   # ← all content
├─ components/         # Frame, Hero, PortraitPipeline, Skills, Projects, Contact, …
├─ assets/             # profile photo + skill logos
└─ fonts/              # Mona Sans + Doto (SIL OFL), self-hosted
```

Skill logos come from [Devicon](https://devicon.dev) (MIT), [Simple Icons](https://simpleicons.org)
(CC0) and the [Biopython](https://biopython.org) project; they remain trademarks of their owners.
