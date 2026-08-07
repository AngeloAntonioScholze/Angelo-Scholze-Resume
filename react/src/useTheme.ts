import { useCallback, useEffect, useState } from 'react';

const THEMES = ['terminal', 'monokai', 'dracula'] as const;
type Theme = (typeof THEMES)[number];

const NEXT_LABEL: Record<Theme, string> = {
  terminal: 'theme --monokai',
  monokai: 'theme --dracula',
  dracula: 'theme --terminal',
};

const isTheme = (v: string | null): v is Theme => THEMES.includes(v as Theme);

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('resume-theme');
    return isTheme(saved) ? saved : 'terminal';
  });

  useEffect(() => {
    if (theme === 'terminal') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
    localStorage.setItem('resume-theme', theme);
  }, [theme]);

  const cycle = useCallback(() => {
    setTheme((t) => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length]);
  }, []);

  return { label: NEXT_LABEL[theme], cycle };
}
