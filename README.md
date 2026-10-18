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

## Quests

The page doubles as a small game: ten quests (switch the theme, find five hidden stars, enter the
Konami code…) tracked in a quest log in the corner, with progress saved in the visitor's browser.

- Quests, XP and ranks live in **`src/app/data/quests.ts`**; each quest is unlocked by calling
  `unlock("<id>")` from `useQuest()` in the component it belongs to.
- Hidden stars are `<HiddenStar id="…" />`; keep `STAR_COUNT` in `quests.ts` equal to how many are placed.
- `QuestProvider` keeps the progress, `QuestHud` draws the button, quest log and toasts.

## Structure

```
src/app/
├─ page.tsx            # section order
├─ layout.tsx          # fonts, metadata, theme bootstrapping
├─ globals.css         # colour tokens (light + dark), utilities, keyframes
├─ data/portfolio.ts   # ← all content
├─ data/frames.ts      # project pictures, with a description of each
├─ data/quests.ts      # quests, XP and ranks for the game layer
├─ components/         # Header, Hero, Skills, Projects, Contact, …
├─ assets/             # profile photo, skill logos, project pictures (assets/work)
└─ fonts/              # Outfit (SIL OFL), self-hosted
```

Skill logos come from [Devicon](https://devicon.dev) (MIT), [Simple Icons](https://simpleicons.org)
(CC0) and the [Biopython](https://biopython.org) project; they remain trademarks of their owners.

Project pictures come from each project's own repository: the plots from the notebook in
[dheovanwa/Supreme-court-judgement-classification](https://github.com/dheovanwa/Supreme-court-judgement-classification)
and the logo from [XQVWMM/NoFake](https://github.com/XQVWMM/NoFake).
