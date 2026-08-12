import { LANGS, NEXT_LANG_LABEL, applyLang, nextIn, savedLang } from '@resume/shared/toggles';
import { computed, ref, watchEffect } from 'vue';

export function useLang() {
  const lang = ref(savedLang());

  watchEffect(() => applyLang(lang.value));

  const cycle = () => {
    lang.value = nextIn(LANGS, lang.value);
  };

  return { lang, label: computed(() => NEXT_LANG_LABEL[lang.value]), cycle };
}
