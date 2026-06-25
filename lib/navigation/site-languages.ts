export interface SiteLanguage {
  code: string;
  flag: string;
  name: string;
}

export const SITE_LANGUAGES: SiteLanguage[] = [
  { code: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'HY', flag: '🇦🇲', name: 'Armenian' },
  { code: 'RU', flag: '🇷🇺', name: 'Russian' },
  { code: 'FR', flag: '🇫🇷', name: 'French' },
  { code: 'ES', flag: '🇪🇸', name: 'Spanish' },
  { code: 'DE', flag: '🇩🇪', name: 'German' },
  { code: 'AR', flag: '🇸🇦', name: 'Arabic' },
];
