import { computed, ref, watchEffect } from 'vue';
import type { Lang } from './data';

const LANGS = ['en', 'pt', 'fr'] as const;

const NEXT_LABEL: Record<Lang, string> = {
  en: 'lang --pt',
  pt: 'lang --fr',
  fr: 'lang --en',
};

const isLang = (v: string | null): v is Lang => LANGS.includes(v as Lang);

export function useLang() {
  const saved = localStorage.getItem('resume-lang');
  const lang = ref<Lang>(isLang(saved) ? saved : 'en');

  watchEffect(() => {
    document.documentElement.lang = lang.value;
    localStorage.setItem('resume-lang', lang.value);
  });

  const cycle = () => {
    lang.value = LANGS[(LANGS.indexOf(lang.value) + 1) % LANGS.length];
  };

  return { lang, label: computed(() => NEXT_LABEL[lang.value]), cycle };
}
