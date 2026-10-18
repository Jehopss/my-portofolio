# Jonathan Hopi Pranata — Portfolio

Personal portfolio built with [Next.js](https://nextjs.org) (static export), Tailwind CSS v4,
Framer Motion and [Lenis](https://lenis.darkroom.engineering/) smooth scrolling.
Deployed to GitHub Pages by `.github/workflows/nextjs.yml` on every push to `main`.

Live: https://jehopss.github.io/my-portofolio/

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into ./out
```

## Editing content

All text lives in **`src/app/data/portfolio.ts`** — profile, contacts, courses, skills,
areas of expertise and projects. Add an item to the right array and the layout picks it up.

- **New skill:** drop an SVG logo into `src/app/assets/skills/`, import it at the top of
  `portfolio.ts`, then add `{ name, kind, category, logo, color }` to `skills`.
  No official logo? Use a [Lucide](https://lucide.dev/icons) icon via `icon` instead.
- **New project:** add `{ title, description, year, areas, gallery, repo, figma? }` to `projects`.
  `areas` drives the project filter; `gallery` lists pictures from `data/frames.ts`.
- **New picture:** save two WebP files in `src/app/assets/work/` (`name-thumb.webp` about 420px
  tall, `name.webp` up to 1600px wide), add a line to `src/app/data/frames.ts` with a sentence
  saying what it shows, then add it to the project's `gallery`.

## Structure

```
src/app/
├─ page.tsx            # section order
├─ layout.tsx          # fonts, metadata, theme bootstrapping
├─ globals.css         # colour tokens (light + dark), utilities, keyframes
├─ data/portfolio.ts   # ← all content
├─ data/frames.ts      # project pictures, with a description of each
├─ components/         # Header, Hero, Skills, Projects, Contact, …
├─ assets/             # profile photo, skill logos, project pictures (assets/work)
└─ fonts/              # Outfit (SIL OFL), self-hosted
```

Skill logos come from [Devicon](https://devicon.dev) (MIT), [Simple Icons](https://simpleicons.org)
(CC0) and the [Biopython](https://biopython.org) project; they remain trademarks of their owners.

Project pictures come from each project's own repository: the plots from the notebook in
[dheovanwa/Supreme-court-judgement-classification](https://github.com/dheovanwa/Supreme-court-judgement-classification)
and the logo from [XQVWMM/NoFake](https://github.com/XQVWMM/NoFake).
