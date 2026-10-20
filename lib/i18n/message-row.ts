import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { toClassicalArmenian } from '@/lib/i18n/western-armenian';

export type LocaleRow = Record<SiteLocaleCode, string>;

/** HYW is classical orthography. Pass `hyw` when a phrase needs a hand-written Western form. */
export function row(
  hy: string,
  en: string,
  ru: string,
  fr: string,
  pt: string,
  hyw?: string,
): LocaleRow {
  return { HY: hy, HYW: hyw ?? toClassicalArmenian(hy), EN: en, RU: ru, FR: fr, PT: pt };
}

export function pickLocale(table: LocaleRow, locale: SiteLocaleCode): string {
  return table[locale] || table.EN;
}
