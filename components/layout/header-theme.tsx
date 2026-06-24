'use client';

import { createContext, useContext, type ReactNode } from 'react';

/** Header always uses the dark heritage theme. */
export type HeaderTheme = 'over-hero';

const HeaderThemeContext = createContext<HeaderTheme>('over-hero');

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  return (
    <HeaderThemeContext.Provider value="over-hero">{children}</HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme(): HeaderTheme {
  return useContext(HeaderThemeContext);
}
