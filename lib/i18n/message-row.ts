import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

export type LocaleRow = Record<SiteLocaleCode, string>;

/** HYW mirrors HY until a dedicated Western Armenian pass exists. */
export function row(hy: string, en: string, ru: string, fr: string, pt: string): LocaleRow {
  return { HY: hy, HYW: hy, EN: en, RU: ru, FR: fr, PT: pt };
}

export function pickLocale(table: LocaleRow, locale: SiteLocaleCode): string {
  return table[locale] || table.EN;
}
