import {
  NEXT_THEME_LABEL,
  THEMES,
  applyTheme,
  nextIn,
  savedTheme,
  type Theme,
} from '@resume/shared/toggles';
import { useCallback, useEffect, useState } from 'react';
import posthog from './posthog';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(savedTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const cycle = useCallback(() => {
    const nextTheme = nextIn(THEMES, theme);
    posthog.capture('theme_changed', { theme: nextTheme });
    setTheme(nextTheme);
  }, [theme]);

  return { label: NEXT_THEME_LABEL[theme], cycle };
}
