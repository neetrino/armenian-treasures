'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';

export type HeaderTheme = 'over-hero' | 'solid';

const HeaderThemeContext = createContext<HeaderTheme>('solid');

function resolveTheme(): HeaderTheme {
  if (typeof window === 'undefined') return 'solid';

  const hero = document.querySelector('[data-site-hero]');
  if (!hero) return 'solid';

  const header = document.querySelector('[data-site-header]');
  const headerHeight = header?.getBoundingClientRect().height ?? 72;
  const heroBottom = hero.getBoundingClientRect().bottom;

  return heroBottom > headerHeight + 4 ? 'over-hero' : 'solid';
}

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<HeaderTheme>('over-hero');

  const syncTheme = useCallback(() => {
    setTheme(resolveTheme());
  }, []);

  useEffect(() => {
    syncTheme();

    window.addEventListener('scroll', syncTheme, { passive: true });
    window.addEventListener('resize', syncTheme, { passive: true });

    return () => {
      window.removeEventListener('scroll', syncTheme);
      window.removeEventListener('resize', syncTheme);
    };
  }, [syncTheme]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(syncTheme);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, syncTheme]);

  return (
    <HeaderThemeContext.Provider value={theme}>{children}</HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme(): HeaderTheme {
  return useContext(HeaderThemeContext);
}
