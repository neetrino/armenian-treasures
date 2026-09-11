import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

const TRANSLATABLE_MARKER = '__at_i18n_v1';
const DEFAULT_LOCALE: SiteLocaleCode = 'EN';

export type LocaleTextMap = Partial<Record<SiteLocaleCode, string>>;

interface StoredTranslatablePayload {
  [TRANSLATABLE_MARKER]: true;
  values: LocaleTextMap;
}

function isLocaleTextMap(value: unknown): value is LocaleTextMap {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const entries = Object.entries(value as Record<string, unknown>);
  return entries.every(
    ([key, entry]) =>
      SITE_LOCALE_CODES.includes(key as SiteLocaleCode) &&
      (typeof entry === 'string' || typeof entry === 'undefined'),
  );
}

function toCleanMap(value: LocaleTextMap): LocaleTextMap {
  const clean: LocaleTextMap = {};
  for (const locale of SITE_LOCALE_CODES) {
    const entry = value[locale];
    if (typeof entry !== 'string') continue;
    const trimmed = entry.trim();
    if (trimmed.length > 0) {
      clean[locale] = trimmed;
    }
  }
  return clean;
}

function parsePayload(raw: string): LocaleTextMap | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
    const maybePayload = parsed as Record<string, unknown>;
    const marker = maybePayload[TRANSLATABLE_MARKER] ?? maybePayload.__AT_I18N_V1;
    if (marker !== true) return null;
    const values = maybePayload.values ?? maybePayload.VALUES;
    if (!isLocaleTextMap(values)) return null;
    return toCleanMap(values);
  } catch {
    return null;
  }
}

/** Infer owner locale for unmarked legacy CMS strings. */
export function inferLocaleFromScript(text: string): SiteLocaleCode | null {
  if (/[\u0530-\u058F]/.test(text)) return 'HY';
  if (/[\u0400-\u04FF]/.test(text)) return 'RU';
  if (/[A-Za-z]/.test(text)) return 'EN';
  return null;
}

function decodeUnmarkedText(value: string): LocaleTextMap {
  // Armenian / Cyrillic unmarked strings stay language-bound (avoids HY under EN/RU).
  if (/[\u0530-\u058F]/.test(value)) {
    return { HY: value, HYW: value };
  }
  if (/[\u0400-\u04FF]/.test(value)) {
    return { RU: value };
  }
  // Latin / numeric / mixed legacy fields (region, period, …) were historically shared.
  const shared: LocaleTextMap = {};
  for (const code of SITE_LOCALE_CODES) {
    shared[code] = value;
  }
  return shared;
}

export function decodeTranslatableText(
  raw: string | null | undefined,
  _fallbackLocale: SiteLocaleCode = DEFAULT_LOCALE,
): LocaleTextMap {
  const value = raw?.trim();
  if (!value) return {};
  const fromPayload = parsePayload(value);
  if (fromPayload) return fromPayload;
  return decodeUnmarkedText(value);
}

export function encodeTranslatableText(
  map: LocaleTextMap,
  fallbackLocale: SiteLocaleCode = DEFAULT_LOCALE,
): string {
  const cleanMap = toCleanMap(map);
  const populatedLocales = SITE_LOCALE_CODES.filter((locale) => Boolean(cleanMap[locale]));
  if (populatedLocales.length === 0) return '';
  if (populatedLocales.length === 1 && populatedLocales[0] === fallbackLocale) {
    return cleanMap[fallbackLocale] ?? '';
  }
  const payload: StoredTranslatablePayload = {
    [TRANSLATABLE_MARKER]: true,
    values: cleanMap,
  };
  return JSON.stringify(payload);
}

export function resolveLocalizedText(
  raw: string | null | undefined,
  locale: SiteLocaleCode,
): string {
  // Strict: never fall back to another locale. Missing translation stays empty.
  const map = decodeTranslatableText(raw);
  return map[locale]?.trim() ?? '';
}

export function getAdminLocaleValue(
  raw: string | null | undefined,
  locale: SiteLocaleCode = DEFAULT_LOCALE,
): string {
  const map = decodeTranslatableText(raw, locale);
  const primary = map[locale]?.trim();
  if (primary) return primary;
  // Admin lists may show any available value so editors still see an entry label.
  for (const code of SITE_LOCALE_CODES) {
    const candidate = map[code]?.trim();
    if (candidate) return candidate;
  }
  return '';
}

export function pickDefaultLocaleText(
  map: LocaleTextMap,
  fallbackLocale: SiteLocaleCode = DEFAULT_LOCALE,
): string {
  const fallback = map[fallbackLocale]?.trim();
  if (fallback) return fallback;
  for (const locale of SITE_LOCALE_CODES) {
    const value = map[locale]?.trim();
    if (value) return value;
  }
  return '';
}

export function readLocalizedTextFromFormData(
  formData: FormData,
  fieldName: string,
): LocaleTextMap {
  const map: LocaleTextMap = {};
  for (const locale of SITE_LOCALE_CODES) {
    const raw = formData.get(`${fieldName}.${locale}`)?.toString() ?? '';
    map[locale] = raw;
  }
  return map;
}

export function buildTabErrorMap(
  fieldErrors: Record<string, string> | undefined,
): Partial<Record<SiteLocaleCode, boolean>> {
  if (!fieldErrors) return {};
  const flags: Partial<Record<SiteLocaleCode, boolean>> = {};
  for (const key of Object.keys(fieldErrors)) {
    const locale = SITE_LOCALE_CODES.find((code) => key.endsWith(`.${code}`));
    if (locale) flags[locale] = true;
  }
  return flags;
}
