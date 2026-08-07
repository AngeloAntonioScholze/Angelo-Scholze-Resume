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

## Switching between the three

Each page has an `[html] [react] [vue]` switcher in the terminal bar. The links
are relative to each build's served location, so they resolve only when all
three are served together from the repo root:

```bash
npm run build
python -m http.server 8000   # then open http://localhost:8000/index.html
```

They do **not** resolve under `npm run dev:*`, where the app is served at `/`
and the `../../` paths escape the server root. `react/dist/` and `vue/dist/`
are gitignored, so a fresh clone needs `npm run build` before the switcher works.

## Notes

- Animations run once at page load. There is no scroll observer.
- Reduced-motion is handled entirely in CSS.
- Three themes — terminal, monokai, dracula — cycled from the terminal bar and
  persisted to `localStorage`.
- TypeScript is pinned to 5.x by a root `overrides` block because `vue-tsc`
  cannot resolve TypeScript 7. Drop the override once it can.
