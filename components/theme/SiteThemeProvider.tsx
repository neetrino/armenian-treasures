'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_SITE_THEME,
  SITE_THEME_STORAGE_KEY,
  resolveInitialSiteTheme,
  type SiteTheme,
} from '@/lib/theme/site-theme';

interface SiteThemeContextValue {
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);

function applySiteTheme(theme: SiteTheme): void {
  document.documentElement.classList.add('theme-transition');
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
  window.setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
  }, 280);
}

function readThemeFromDom(): SiteTheme {
  const value = document.documentElement.dataset.theme;
  return value === 'light' ? 'light' : DEFAULT_SITE_THEME;
}

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>(DEFAULT_SITE_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SITE_THEME_STORAGE_KEY);
    const resolved = resolveInitialSiteTheme(stored);
    setThemeState(resolved);
    applySiteTheme(resolved);
    setMounted(true);

    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onSystemChange = (): void => {
      if (localStorage.getItem(SITE_THEME_STORAGE_KEY)) {
        return;
      }

      const next = media.matches ? 'light' : 'dark';
      setThemeState(next);
      applySiteTheme(next);
    };

    media.addEventListener('change', onSystemChange);
    return () => media.removeEventListener('change', onSystemChange);
  }, []);

  const setTheme = useCallback((next: SiteTheme) => {
    setThemeState(next);
    applySiteTheme(next);
    localStorage.setItem(SITE_THEME_STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = readThemeFromDom();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, mounted }),
    [theme, setTheme, toggleTheme, mounted],
  );

  return <SiteThemeContext.Provider value={value}>{children}</SiteThemeContext.Provider>;
}

export function useSiteTheme(): SiteThemeContextValue {
  const context = useContext(SiteThemeContext);
  if (!context) {
    throw new Error('useSiteTheme must be used within SiteThemeProvider');
  }
  return context;
}
