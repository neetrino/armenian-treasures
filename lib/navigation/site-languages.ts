export interface SiteLanguage {
  code: string;
  flag: string;
  name: string;
}

/** Content is English-only today. Planned locales — not selectable until i18n ships. */
export const CURRENT_SITE_LANGUAGE: SiteLanguage = {
  code: 'EN',
  flag: '🇬🇧',
  name: 'English',
};

export const PLANNED_SITE_LANGUAGES: SiteLanguage[] = [
  { code: 'HY', flag: '🇦🇲', name: 'Armenian' },
  { code: 'RU', flag: '🇷🇺', name: 'Russian' },
  { code: 'FR', flag: '🇫🇷', name: 'French' },
  { code: 'ES', flag: '🇪🇸', name: 'Spanish' },
  { code: 'DE', flag: '🇩🇪', name: 'German' },
  { code: 'AR', flag: '🇸🇦', name: 'Arabic' },
];

/** @deprecated Use CURRENT_SITE_LANGUAGE. Full list reserved for future i18n. */
export const SITE_LANGUAGES: SiteLanguage[] = [CURRENT_SITE_LANGUAGE, ...PLANNED_SITE_LANGUAGES];
