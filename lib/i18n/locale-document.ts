import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

const MARKER = '__at_i18n_v1';

type LocaleMap<T> = Partial<Record<SiteLocaleCode, T>>;

function isPayload(value: unknown): value is { values: Record<string, unknown> } {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return record[MARKER] === true && typeof record.values === 'object' && record.values !== null;
}

export function decodeLocaleDocument<T>(raw: unknown, normalize: (value: unknown) => T): LocaleMap<T> {
  if (isPayload(raw)) {
    const map: LocaleMap<T> = {};
    for (const locale of SITE_LOCALE_CODES) {
      const entry = raw.values[locale];
      if (entry !== undefined) map[locale] = normalize(entry);
    }
    return map;
  }
  if (raw === undefined || raw === null) return {};
  return { EN: normalize(raw) };
}

export function encodeLocaleDocument<T>(map: LocaleMap<T>): { [MARKER]: true; values: LocaleMap<T> } {
  const values: LocaleMap<T> = {};
  for (const locale of SITE_LOCALE_CODES) {
    if (map[locale] !== undefined) values[locale] = map[locale];
  }
  return { [MARKER]: true, values };
}

export function resolveLocaleDocument<T>(
  raw: unknown,
  locale: SiteLocaleCode,
  normalize: (value: unknown) => T,
): T | undefined {
  return decodeLocaleDocument(raw, normalize)[locale];
}
