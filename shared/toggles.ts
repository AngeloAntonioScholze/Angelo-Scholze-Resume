export const THEMES = ['terminal', 'monokai', 'dracula'] as const;
export type Theme = (typeof THEMES)[number];

export const LANGS = ['en', 'pt', 'fr'] as const;
export type Lang = (typeof LANGS)[number];

export const THEME_KEY = 'resume-theme';
export const LANG_KEY = 'resume-lang';

export const NEXT_THEME_LABEL: Record<Theme, string> = {
  terminal: 'theme --monokai',
  monokai: 'theme --dracula',
  dracula: 'theme --terminal',
};

export const NEXT_LANG_LABEL: Record<Lang, string> = {
  en: 'lang --pt',
  pt: 'lang --fr',
  fr: 'lang --en',
};

export const isTheme = (v: string | null): v is Theme => THEMES.includes(v as Theme);
export const isLang = (v: string | null): v is Lang => LANGS.includes(v as Lang);

export function nextIn<T extends string>(list: readonly T[], current: T): T {
  return list[(list.indexOf(current) + 1) % list.length];
}

export function applyTheme(theme: Theme) {
  if (theme === 'terminal') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

export function applyLang(lang: Lang) {
  document.documentElement.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
}

export const savedTheme = (): Theme => {
  const v = localStorage.getItem(THEME_KEY);
  return isTheme(v) ? v : 'terminal';
};

export const savedLang = (): Lang => {
  const v = localStorage.getItem(LANG_KEY);
  return isLang(v) ? v : 'en';
};
