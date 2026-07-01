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
    if (maybePayload[TRANSLATABLE_MARKER] !== true) return null;
    if (!isLocaleTextMap(maybePayload.values)) return null;
    return toCleanMap(maybePayload.values);
  } catch {
    return null;
  }
}

export function decodeTranslatableText(
  raw: string | null | undefined,
  fallbackLocale: SiteLocaleCode = DEFAULT_LOCALE,
): LocaleTextMap {
  const value = raw?.trim();
  if (!value) return {};
  const fromPayload = parsePayload(value);
  if (fromPayload) return fromPayload;
  return { [fallbackLocale]: value };
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
  fallbackLocale: SiteLocaleCode = DEFAULT_LOCALE,
): string {
  const map = decodeTranslatableText(raw, fallbackLocale);
  const primary = map[locale]?.trim();
  if (primary) return primary;
  const fallback = map[fallbackLocale]?.trim();
  if (fallback) return fallback;
  for (const code of SITE_LOCALE_CODES) {
    const candidate = map[code]?.trim();
    if (candidate) return candidate;
  }
  return '';
}

export function getAdminLocaleValue(
  raw: string | null | undefined,
  locale: SiteLocaleCode = DEFAULT_LOCALE,
): string {
  return resolveLocalizedText(raw, locale, DEFAULT_LOCALE);
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
