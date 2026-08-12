import { cp, rm } from 'node:fs/promises';

// Vite only copies a build's own publicDir, so each build needs the shared
// binaries physically present. `assets/` is the one committed copy; these two
// are generated and gitignored.
const targets = ['react/public/assets', 'vue/public/assets'];

for (const target of targets) {
  await rm(target, { recursive: true, force: true });
  await cp('assets', target, { recursive: true });
}

console.log(`synced assets/ -> ${targets.join(', ')}`);
