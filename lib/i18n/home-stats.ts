import { localizedHomeStats } from '@/lib/i18n/home-fallbacks';
import { resolveLocaleDocument } from '@/lib/i18n/locale-document';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { inferLocaleFromScript } from '@/lib/i18n/translatable-content';
import { normalizeHomeStats, type HomeStat } from '@/lib/types/home-content';

function contradictsLocale(label: string, locale: SiteLocaleCode): boolean {
  const script = inferLocaleFromScript(label);
  if (script === 'HY') return locale !== 'HY';
  if (script === 'RU') return locale !== 'RU';
  return script === 'EN' && (locale === 'HY' || locale === 'RU');
}

function withStoredValues(labels: HomeStat[], stored: HomeStat[]): HomeStat[] {
  return labels.map((item, index) => ({
    label: item.label,
    value: stored[index]?.value.trim() || item.value,
  }));
}

/** CMS stats saved as one language must not appear under another locale. */
export function resolvePublicHomeStats(raw: unknown, locale: SiteLocaleCode): HomeStat[] {
  const direct = resolveLocaleDocument(raw, locale, normalizeHomeStats);
  if (direct && direct.every((stat) => !contradictsLocale(stat.label, locale))) return direct;

  const plain = Array.isArray(raw) ? normalizeHomeStats(raw) : [];
  const plainFits =
    !direct &&
    plain.length > 0 &&
    (locale === 'EN' || locale === 'HY' || locale === 'RU') &&
    plain.every((stat) => !contradictsLocale(stat.label, locale));
  if (plainFits) return plain;

  return withStoredValues(localizedHomeStats(locale), plain.length > 0 ? plain : (direct ?? []));
}
