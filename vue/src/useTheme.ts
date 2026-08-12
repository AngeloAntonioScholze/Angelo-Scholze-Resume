import { NEXT_THEME_LABEL, THEMES, applyTheme, nextIn, savedTheme } from '@resume/shared/toggles';
import { computed, ref, watchEffect } from 'vue';

export function useTheme() {
  const theme = ref(savedTheme());

  watchEffect(() => applyTheme(theme.value));

  const cycle = () => {
    theme.value = nextIn(THEMES, theme.value);
  };

  return { label: computed(() => NEXT_THEME_LABEL[theme.value]), cycle };
}
