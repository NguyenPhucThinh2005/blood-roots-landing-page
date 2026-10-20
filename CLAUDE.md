# Blood Root — landing page (Hextrix Studio, EXE201 @ FPT)

Single-page, frontend-only marketing site for **Blood Root**, deployed on Vercel to present the game to lecturers. Goal: progressively approach Awwwards-level craft. No backend.

## The game (source: GDD_Final on the team Drive — story is being revised, confirm copy with the team)

- First-person psychological horror / puzzle / exploration, PC, built in Unity 3D. Rooted in Vietnamese folklore ("một game thuần Việt").
- Premise: X, a university student who lost their mother young, comes home after their father (a retired policeman) falls into an unexplained deep coma. X runs the family grocery store (tiệm tạp hóa) while uncovering the father's investigation into villagers who fall into comas.
- Antagonist: a tree entity (the "blood root") that every 10–12 years captures the souls of wounded people, feeds on their guilt and regret, and builds nightmare realms from their memories. Victims become "gatekeepers" of chapters.
- Chapter 1 "Cô giáo": teacher Cô Mai (normal + corrupted forms); school corridor, classroom, staff room, storage room.
- Signature mechanic: a photo split into a 9-tile sliding puzzle. Other motifs: ancestral altar (bàn thờ), incense, mother's portrait, diary, retro radio, key.

## Art direction (current brand assets in Drive `MEDIA/`)

- Blood red on near-black, bone-white type, grain, cobwebs, distressed hand-drawn display lettering ("BLOOD ROOT", "COMING SOON" poster with eyes in the O's).
- Tokens live in `src/index.css` `@theme` (`blood-*`, `void`, `ash`, `bone`). Use tokens, not raw hex.
- Body font: Be Vietnam Pro (`@fontsource/be-vietnam-pro`). **Every font must support Vietnamese diacritics** — test with "Sắp ra mắt, giải đố, tiệm tạp hóa". The logo is an SVG exported from `TYPO GAME.ai`, never a font.

## Stack & conventions

- Vite 8 + React 19.3 + TypeScript + Tailwind v4. **Keep React `~19.3`** — `@react-three/fiber` 9 requires `react <19.4`.
- **GSAP is the only animation engine.** Import from `src/lib/gsap.ts` (plugins registered there), animate in components with `useGSAP({ scope })`. Do not add Motion/framer-motion.
- Smooth scroll: Lenis via `src/providers/SmoothScroll.tsx`, ticked by `gsap.ticker` and wired to `ScrollTrigger.update`. Use `useLenis()` for `scrollTo`.
- Reduced motion: wrap timelines in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`; use `useReducedMotion()` for React branches (e.g. skip WebGL). Lenis already respects it.
- 3D: everything three/R3F lives in `src/webgl/` and is loaded with `React.lazy` so it stays out of the initial bundle. Use drei `PerformanceMonitor` to drop DPR on weak GPUs; always provide an image/video fallback.
- Copy: all user-facing text goes through `src/i18n` (`vi.ts` is the source of truth, `en.ts` must match the `Dictionary` type). Read with `useT()`.
- Sound: register files in `src/audio/sounds.ts`, play via `getSound(name)`. Global mute is controlled by `SoundProvider` and is **off by default**.
- Class merging: `cn()` from `src/lib/cn.ts`.
- Sections go in `src/sections/`, reusable pieces (cursor, preloader, buttons) in `src/components/`.

## Assets & budgets

- `raw-assets/` (gitignored): PSD/AI/raw recordings. Export optimized files into the repo:
  - Images → `src/assets/images/`, import with vite-imagetools queries (`?w=1600&format=avif`, `&as=picture`).
  - Video → `public/media/video/` as H.264 MP4 (+ optional WebM) with a poster frame.
  - Models → `public/media/models/` after `gltf-transform optimize`.
  - Audio → `public/media/audio/` (WebM/Opus + MP3 fallback).
- Budgets: initial JS ≤ ~250 KB gzip (WebGL chunk excluded), hero video ≤ ~8 MB, each model ≤ ~3 MB, LCP < 2.5 s on 4G.
- Third-party models (Sketchfab etc.) must have a license that allows use; CC-BY requires a visible credit in a Credits section.

## Skills installed (project-level, `.claude/skills/`)

design-taste-frontend (taste-skill), gsap-* (official GreenSock), web-design-guidelines and vercel-react-best-practices (Vercel). Restore with `npx skills experimental_install` from `skills-lock.json`.

## Commands

`npm run dev` · `npm run build` · `npm run preview` · `npm run typecheck` · `npm run lint` (oxlint) · `npm run format`
