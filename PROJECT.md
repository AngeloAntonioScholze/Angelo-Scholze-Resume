# resume_landing_page

Living project doc for agents and feature lookups. Update `## Features` and `## Decisions` in the same commit as the feature (`/feature-doc`). Tasks live in the root beads DB under label `repo:resume_landing_page`.

## Purpose
Terminal-themed resume landing page, built three times from the same design and content: a static `index.html`, React 19 and Vue 3. Deployed to GitHub Pages.

## Stack
npm workspaces (`react/`, `vue/`, `shared/` as `@resume/shared`), Vite, TypeScript 5.x (pinned by a root `overrides` block because `vue-tsc` can't resolve TS 7).

## Commands
- `npm install`
- `npm run dev:react`, `npm run dev:vue` — one app at `/`; the switcher links don't resolve here
- `npm run build`, then `npm run assemble` → `site/`, then `cd site && python -m http.server 8000` — checks the switcher

## Gates
Run from `resume_landing_page/`.
1. **build**: `npm run build` (syncs assets, typechecks and builds both apps)
2. **assemble**: `npm run assemble`
3. **static**: open `index.html` and check the copy matches `shared/data.ts`

## Architecture
```
index.html   static build; self-contained CSS + content, no tooling
shared/      data.ts (en/pt/fr copy), styles.css (whole design), toggles.ts (theme+lang state), projects.ts
react/       React 19 + Vite: Typed, useTheme/useLang glue
vue/         Vue 3 + Vite: same glue as refs
assets/      PDF, favicons, webmanifest — the only committed copy
scripts/     assemble.mjs (deployed layout), sync-assets.mjs
```
Deploy: a push to `main` runs `.github/workflows/deploy.yml`, which builds, assembles and publishes `site/` to Pages. `dist/` and `site/` are gitignored.

## Rules
- **Content or design changes go to all three.** Edit `shared/` (React + Vue pick it up) **and** `index.html`: its inline CSS and its `I18N` table keyed by `data-i18n`. The English text lives in the DOM.
- Content is stored as segments (`string | { gold: string }`). Never use `dangerouslySetInnerHTML` / `v-html`.
- `scripts/assemble.mjs` is the only definition of the deployed layout.
- The site's experience list isn't a mirror of the PDF. IBF (Aug–Nov 2021) stays on purpose. The PDF is English-only.

## Hot spots
- `shared/data.ts`
- `shared/styles.css`
- `index.html`

## Features
- **Three implementations** with an `[html] [react] [vue]` switcher in the terminal bar, using relative links.
- **Themes**: terminal / monokai / dracula, persisted in `localStorage`.
- **Languages**: en / pt / fr, persisted, mirrored to `<html lang>`. Switching replays the typing animation.
- Animations run once at load. Reduced-motion is handled in CSS.
- Recent content changes: experience bumped to eight years (`addcd89`), FR Cappta copy fix (`45ddd74`).

## Decisions
- `shared/` is an npm workspace rather than copied files, so the two framework builds can't drift.
- 2026-11-06: Moved agent config to the projects root. This file replaces the per-repo CLAUDE.md/AGENTS.md.
