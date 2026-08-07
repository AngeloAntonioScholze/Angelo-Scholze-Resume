import { computed, ref, watchEffect } from 'vue';

const THEMES = ['terminal', 'monokai', 'dracula'] as const;
type Theme = (typeof THEMES)[number];

const NEXT_LABEL: Record<Theme, string> = {
  terminal: 'theme --monokai',
  monokai: 'theme --dracula',
  dracula: 'theme --terminal',
};

const isTheme = (v: string | null): v is Theme => THEMES.includes(v as Theme);

export function useTheme() {
  const saved = localStorage.getItem('resume-theme');
  const theme = ref<Theme>(isTheme(saved) ? saved : 'terminal');

  watchEffect(() => {
    if (theme.value === 'terminal') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme.value;
    localStorage.setItem('resume-theme', theme.value);
  });

  const cycle = () => {
    theme.value = THEMES[(THEMES.indexOf(theme.value) + 1) % THEMES.length];
  };

  return { label: computed(() => NEXT_LABEL[theme.value]), cycle };
}
