# Jonathan Hopi Pranata — Portfolio

Personal portfolio built with [Next.js](https://nextjs.org) (static export) and Tailwind CSS v4.
Deployed to GitHub Pages by `.github/workflows/nextjs.yml` on every push to `main`.

Live: https://jehopss.github.io/my-portofolio/

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into ./out
```

## The design

The page is laid out like a photographer's contact sheet: rows of frames taken from the projects
themselves (app screens and model plots), each marked with one colour of the
[palette](https://coolors.co/2f6690-3a7ca5-d9dcd6-16425b-81c3d7). Tap any frame to see it full size.
The direction was dealt by the `design-taste-frontend` skill in `.claude/skills/` (direction
"The contact sheet", seed 569192657); its inspector checks the build:

```bash
npm run build
npx serve out   # or any static server
node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:3000/
```

## Editing content

All text lives in **`src/app/data/portfolio.ts`** — profile, contacts, courses, skills,
areas of focus and projects. Add an item to the right array and the layout picks it up.

- **New skill:** drop an SVG logo into `src/app/assets/skills/`, import it at the top of
  `portfolio.ts`, then add `{ name, kind, category, logo }` to `skills`.
  No official logo? Use a [Lucide](https://lucide.dev/icons) icon via `icon` instead.
- **New project:** add it to `projects` with a three-word `kind`, the `year`, its `areas`
  (used by the Work filters), one of the palette colours and its `frames`.
- **New frame:** save two WebP files in `src/app/assets/work/` (`name-thumb.webp` about 420px
  tall for the sheet, `name.webp` up to 1600px wide for the viewer), add a line to
  `src/app/data/frames.ts` with a sentence saying what it shows, then list it in the project's
  `frames` (its strip) or `moreFrames` (the sheet at the top only).

## Structure

```
src/app/
├─ page.tsx            # section order
├─ layout.tsx          # font, metadata, theme bootstrapping
├─ globals.css         # colour tokens (light + dark), type steps, motion
├─ data/portfolio.ts   # ← all content
├─ data/frames.ts      # every picture from the projects, with its description
├─ components/         # Hero (contact sheet), Work, About, Tools, Contact, Footer, Viewer, …
├─ assets/             # profile photo, skill logos, project frames (assets/work)
└─ fonts/              # Outfit (SIL OFL), self-hosted
public/work/           # the Finwise screen recording
```

## Where the pictures come from

Every frame comes from the project's own repository:

- **Finwise:** screens and the recording are cut from the "Website Preview" GIF in
  [KepinTheNoob/Finwise](https://github.com/KepinTheNoob/Finwise).
- **Supreme Court Judgement Classification:** the plots are the outputs of the notebook in
  [dheovanwa/Supreme-court-judgement-classification](https://github.com/dheovanwa/Supreme-court-judgement-classification).
- **Serenity:** crops of the app's background illustration in
  [dheovanwa/Serenity](https://github.com/dheovanwa/Serenity).
- **NoFake:** the logo from [XQVWMM/NoFake](https://github.com/XQVWMM/NoFake).
- **DeepPlan:** the app icon from [KepinTheNoob/DeepPlan](https://github.com/KepinTheNoob/DeepPlan).

Skill logos come from [Devicon](https://devicon.dev) (MIT), [Simple Icons](https://simpleicons.org)
(CC0) and the [Biopython](https://biopython.org) project; they remain trademarks of their owners.
