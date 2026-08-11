# angelo-scholze-resume

A terminal-themed resume landing page, built three times over: once as a single
static HTML file, once in React, once in Vue. Same design, same content, three
implementations you can diff against each other.

## Layout

```
index.html      static build — no tooling, open it directly
react/          React 19 + Vite
vue/            Vue 3 + Vite
assets/         resume PDF
scripts/        assemble.mjs — builds the deployed site/ layout
```

`react/` and `vue/` are npm workspaces of the repo root.

## Running

```bash
npm install       # installs both workspaces
npm run build     # builds both
npm run dev:react
npm run dev:vue
```

The static version needs nothing — open `index.html`.

## How the three stay in sync

`styles.css` and `data.ts` are kept byte-identical between `react/src/` and
`vue/src/`, so the design and the copy have a single source of truth. Only
`projects.ts` differs, marking which build is active in the switcher.

Page content is stored as segments (`string | { gold: string }`) rather than
HTML strings, which keeps the highlighted terms out of `dangerouslySetInnerHTML`
and `v-html`.

`data.ts` exports `content: Record<Lang, Content>` — English, Portuguese and
French copy behind one shape. The static build carries its English copy in the
markup and keeps the other two in an `I18N` table in the page script, keyed by
`data-i18n` attributes; the English strings are read back out of the DOM at load
so they are never written twice.

## Switching between the three

Each page has an `[html] [react] [vue]` switcher in the terminal bar. The links
are relative, so they work both at a domain root and under a GitHub Pages
project subpath. They resolve against the *assembled* layout:

```
/            index.html   (static)
/react/      React build
/vue/        Vue build
```

To reproduce that layout locally:

```bash
npm run build
npm run assemble          # -> site/
cd site && python -m http.server 8000
```

The switcher does **not** resolve under `npm run dev:*`, where a single app is
served alone at `/` and the `../` paths escape the server root. Use `dev` for
working on one implementation, `assemble` to check the switcher.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds both
workspaces, runs the same `npm run assemble`, and publishes `site/` to GitHub
Pages. Build output is never committed — `dist/` and `site/` are gitignored, so
the published site cannot drift from the source.

`scripts/assemble.mjs` is the single definition of the deployed layout; CI and
local preview both call it, so they cannot disagree.

## Notes

- Animations run once at page load. There is no scroll observer.
- Reduced-motion is handled entirely in CSS.
- Three themes — terminal, monokai, dracula — cycled from the terminal bar and
  persisted to `localStorage`.
- Three languages — en, pt, fr — cycled from the terminal bar, persisted to
  `localStorage`, and mirrored onto `<html lang>`. Switching replays the typing
  animation. The resume PDF stays English-only.
- TypeScript is pinned to 5.x by a root `overrides` block because `vue-tsc`
  cannot resolve TypeScript 7. Drop the override once it can.
