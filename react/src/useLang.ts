import {
  LANGS,
  NEXT_LANG_LABEL,
  applyLang,
  nextIn,
  savedLang,
  type Lang,
} from '@resume/shared/toggles';
import { useCallback, useEffect, useState } from 'react';

export function useLang() {
  const [lang, setLang] = useState<Lang>(savedLang);

  useEffect(() => {
    applyLang(lang);
  }, [lang]);

  const cycle = useCallback(() => setLang((l) => nextIn(LANGS, l)), []);

  return { lang, label: NEXT_LANG_LABEL[lang], cycle };
}
