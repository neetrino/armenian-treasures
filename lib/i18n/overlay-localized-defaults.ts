import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const SKIP_KEYS = new Set([
  'href',
  'src',
  'embed',
  'url',
  'ctaHref',
  'ctaUrl',
  'image',
  'heroImage',
  'iconSrc',
  'sourceHref',
  'icon',
  'id',
  'ctaVariant',
  'cardBackgroundImage',
  'before',
  'after',
  'badgeClass',
  'iconStroke',
  'color',
  'tone',
  'top',
  'left',
  'delay',
  'amountAmd',
  'monthlyAmd',
  'annualAmd',
  'target',
  'min',
  'max',
  'suffixSize',
  'suffixColor',
  'row',
  'status',
  'wide',
  'future',
  'cover',
  'featured',
  'recommended',
  'primary',
  'customPrice',
  'included',
  'imgBase',
  'sectionVisibility',
  'certificateUrls',
  'patronSliderTicks',
  'patronQuickChips',
  'particles',
  'pins',
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function overlayNode(stored: unknown, english: unknown, localized: unknown): unknown {
  if (typeof stored === 'string') {
    if (typeof english !== 'string' || typeof localized !== 'string') return stored;
    const trimmed = stored.trim();
    if (!trimmed || trimmed === english.trim()) return localized;
    return stored;
  }

  if (Array.isArray(stored)) {
    if (!Array.isArray(english) || !Array.isArray(localized)) return stored;
    return stored.map((item, index) => overlayNode(item, english[index], localized[index] ?? item));
  }

  if (isPlainObject(stored)) {
    if (!isPlainObject(english) || !isPlainObject(localized)) return stored;
    const next: Record<string, unknown> = { ...stored };
    for (const key of Object.keys(stored)) {
      if (SKIP_KEYS.has(key)) continue;
      next[key] = overlayNode(stored[key], english[key], localized[key] ?? stored[key]);
    }
    return next;
  }

  return stored;
}

/** Replace default English copy with locale strings; keep admin-customized values. */
export function overlayLocalizedDefaults<T>(
  stored: T,
  english: T,
  localized: T,
  locale: SiteLocaleCode,
): T {
  if (locale === 'EN') return stored;
  return overlayNode(stored, english, localized) as T;
}
