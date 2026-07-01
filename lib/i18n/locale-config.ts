/** Supported public site locales per AT Features / stakeholder feedback. */
export const SITE_LOCALE_CODES = ['HY', 'RU', 'EN', 'FR', 'PT'] as const;

export type SiteLocaleCode = (typeof SITE_LOCALE_CODES)[number];

export interface SiteLocaleDefinition {
  code: SiteLocaleCode;
  flag: string;
  name: string;
  /** True when full UI translations ship; English is the only live locale today. */
  hasTranslations: boolean;
}

export const SITE_LOCALE_DEFINITIONS: SiteLocaleDefinition[] = [
  { code: 'HY', flag: '🇦🇲', name: 'Armenian', hasTranslations: false },
  { code: 'RU', flag: '🇷🇺', name: 'Russian', hasTranslations: false },
  { code: 'EN', flag: '🇬🇧', name: 'English', hasTranslations: true },
  { code: 'FR', flag: '🇫🇷', name: 'French', hasTranslations: false },
  { code: 'PT', flag: '🇵🇹', name: 'Portuguese', hasTranslations: false },
];

export const DEFAULT_ENABLED_LOCALES: SiteLocaleCode[] = ['EN'];

export function isSiteLocaleCode(value: string): value is SiteLocaleCode {
  return (SITE_LOCALE_CODES as readonly string[]).includes(value);
}

export function parseEnabledLocales(raw: unknown): SiteLocaleCode[] {
  if (!Array.isArray(raw)) return [...DEFAULT_ENABLED_LOCALES];
  const parsed = raw.filter((item): item is SiteLocaleCode => typeof item === 'string' && isSiteLocaleCode(item));
  return parsed.length > 0 ? parsed : [...DEFAULT_ENABLED_LOCALES];
}

export function resolveLocaleDefinition(code: SiteLocaleCode): SiteLocaleDefinition {
  const found = SITE_LOCALE_DEFINITIONS.find((locale) => locale.code === code);
  if (found) return found;
  return SITE_LOCALE_DEFINITIONS.find((locale) => locale.code === 'EN')!;
}
