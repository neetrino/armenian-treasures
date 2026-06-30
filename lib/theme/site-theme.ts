export type SiteTheme = 'dark' | 'light';

export const SITE_THEME_STORAGE_KEY = 'at-site-theme';

export const DEFAULT_SITE_THEME: SiteTheme = 'dark';

export function isSiteTheme(value: string | null | undefined): value is SiteTheme {
  return value === 'dark' || value === 'light';
}

export function resolveSiteTheme(value: string | null | undefined): SiteTheme {
  return isSiteTheme(value) ? value : DEFAULT_SITE_THEME;
}

export function resolveSystemSiteTheme(): SiteTheme {
  if (typeof window === 'undefined') {
    return DEFAULT_SITE_THEME;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function resolveInitialSiteTheme(stored: string | null | undefined): SiteTheme {
  if (isSiteTheme(stored)) {
    return stored;
  }

  return resolveSystemSiteTheme();
}
