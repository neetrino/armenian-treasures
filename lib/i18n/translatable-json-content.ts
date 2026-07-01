import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

const JSON_MARKER = '__at_i18n_v1';

type JsonObject = Record<string, unknown>;
type LocalizedJsonMap = Partial<Record<SiteLocaleCode, JsonObject>>;

interface LocalizedJsonPayload {
  [JSON_MARKER]: true;
  values: LocalizedJsonMap;
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isLocalizedJsonContent(value: unknown): value is LocalizedJsonPayload {
  if (!isJsonObject(value)) return false;
  if (value[JSON_MARKER] !== true) return false;
  if (!isJsonObject(value.values)) return false;
  return true;
}

export function resolveLocalizedJsonContent(
  value: unknown,
  locale: SiteLocaleCode,
  fallbackLocale: SiteLocaleCode = 'EN',
): JsonObject {
  if (!isLocalizedJsonContent(value)) {
    return isJsonObject(value) ? value : {};
  }
  const localized = value.values[locale];
  if (isJsonObject(localized)) return localized;
  const fallback = value.values[fallbackLocale];
  if (isJsonObject(fallback)) return fallback;
  for (const code of SITE_LOCALE_CODES) {
    const candidate = value.values[code];
    if (isJsonObject(candidate)) return candidate;
  }
  return {};
}

export function mergeLocalizedJsonContent(
  existing: unknown,
  locale: SiteLocaleCode,
  content: JsonObject,
): unknown {
  const map: LocalizedJsonMap = isLocalizedJsonContent(existing) ? { ...existing.values } : {};
  map[locale] = content;
  const locales = SITE_LOCALE_CODES.filter((code) => isJsonObject(map[code]));
  if (locales.length === 1 && locales[0] === 'EN') return map.EN ?? {};
  return {
    [JSON_MARKER]: true,
    values: map,
  } satisfies LocalizedJsonPayload;
}
