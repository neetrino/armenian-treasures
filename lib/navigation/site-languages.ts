import {
  DEFAULT_ENABLED_LOCALES,
  resolveLocaleDefinition,
  SITE_LOCALE_DEFINITIONS,
  type SiteLocaleCode,
} from '@/lib/i18n/locale-config';

export interface SiteLanguage {
  code: SiteLocaleCode;
  flag: string;
  name: string;
  hasTranslations: boolean;
}

export const CURRENT_SITE_LANGUAGE: SiteLanguage = resolveLocaleDefinition('EN');

/** All locales defined for the product (HY, RU, EN, FR, PT). */
export const ALL_SITE_LANGUAGES: SiteLanguage[] = SITE_LOCALE_DEFINITIONS.map((locale) => ({
  code: locale.code,
  flag: locale.flag,
  name: locale.name,
  hasTranslations: locale.hasTranslations,
}));

export function resolveEnabledSiteLanguages(enabledCodes: SiteLocaleCode[]): SiteLanguage[] {
  const enabled = new Set(enabledCodes);
  return ALL_SITE_LANGUAGES.filter((locale) => enabled.has(locale.code));
}

/** @deprecated Use resolveEnabledSiteLanguages with admin settings. */
export const SITE_LANGUAGES: SiteLanguage[] = resolveEnabledSiteLanguages(DEFAULT_ENABLED_LOCALES);
