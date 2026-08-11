import { useCallback, useEffect, useState } from 'react';
import type { Lang } from './data';

const LANGS = ['en', 'pt', 'fr'] as const;

const NEXT_LABEL: Record<Lang, string> = {
  en: 'lang --pt',
  pt: 'lang --fr',
  fr: 'lang --en',
};

const isLang = (v: string | null): v is Lang => LANGS.includes(v as Lang);

export function useLang() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('resume-lang');
    return isLang(saved) ? saved : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('resume-lang', lang);
  }, [lang]);

  const cycle = useCallback(() => {
    setLang((l) => LANGS[(LANGS.indexOf(l) + 1) % LANGS.length]);
  }, []);

  return { lang, label: NEXT_LABEL[lang], cycle };
}
