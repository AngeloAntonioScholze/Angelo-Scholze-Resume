import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

const OUT = 'site';

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

await cp('index.html', `${OUT}/index.html`);
await cp('assets', `${OUT}/assets`, { recursive: true });
await cp('react/dist', `${OUT}/react`, { recursive: true });
await cp('vue/dist', `${OUT}/vue`, { recursive: true });

// GitHub Pages runs Jekyll by default, which drops underscore-prefixed paths.
await writeFile(`${OUT}/.nojekyll`, '');

console.log(`assembled ${OUT}/ — index.html, assets/, react/, vue/`);
