import {
  NEXT_THEME_LABEL,
  THEMES,
  applyTheme,
  nextIn,
  savedTheme,
  type Theme,
} from '@resume/shared/toggles';
import { useCallback, useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(savedTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const cycle = useCallback(() => setTheme((t) => nextIn(THEMES, t)), []);

  return { label: NEXT_THEME_LABEL[theme], cycle };
}
