import {
  LANGS,
  NEXT_LANG_LABEL,
  applyLang,
  nextIn,
  savedLang,
  type Lang,
} from '@resume/shared/toggles';
import { useCallback, useEffect, useState } from 'react';
import posthog, { posthogLogger } from './posthog';

export function useLang() {
  const [lang, setLang] = useState<Lang>(savedLang);

  useEffect(() => {
    applyLang(lang);
  }, [lang]);

  const cycle = useCallback(() => {
    const nextLang = nextIn(LANGS, lang);
    posthog.capture('language_changed', { language: nextLang });
    posthogLogger.info('language preference changed', { interaction: 'language_change' });
    setLang(nextLang);
  }, [lang]);

  return { lang, label: NEXT_LANG_LABEL[lang], cycle };
}
