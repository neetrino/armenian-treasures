import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { decodeTranslatableText } from '@/lib/i18n/translatable-content';
import { SITE_LOCALE_CODES } from '@/lib/i18n/locale-config';
import { parseCultureItemMedia } from '@/lib/culture-item-media';
import { parseMediaByLocale, mediaForLocale } from '@/lib/culture-item-media-locale';
import { toTourEmbedSrc, isSketchfabShortUrl } from '@/lib/embed-urls';

async function loadDotEnv(): Promise<void> {
  const envRaw = await readFile(resolve(process.cwd(), '.env'), 'utf8');
  for (const line of envRaw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const delimiter = trimmed.indexOf('=');
    if (delimiter <= 0) continue;
    const key = trimmed.slice(0, delimiter).trim();
    let value = trimmed.slice(delimiter + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

type Check = { ok: boolean; label: string; detail?: string };

async function main(): Promise<void> {
  await loadDotEnv();
  const { prisma } = await import('@/lib/db');
  const checks: Check[] = [];

  try {
    const settings = await prisma.siteSettings.findFirst();
    const locales = Array.isArray(settings?.enabledLocales)
      ? (settings.enabledLocales as string[])
      : [];
    checks.push({
      ok: SITE_LOCALE_CODES.every((code) => locales.includes(code)),
      label: 'SiteSettings.enabledLocales includes all 6',
      detail: locales.join(', ') || '(empty)',
    });

    const item = await prisma.cultureItem.findUnique({
      where: { slug: 'qa-i18n-full-demo' },
      include: { menuItem: { include: { parent: true } } },
    });

    checks.push({
      ok: Boolean(item),
      label: 'QA culture item exists',
      detail: item ? `${item.id} / ${item.status}` : 'NOT FOUND',
    });
    if (!item) {
      printReport(checks);
      return;
    }

    checks.push({
      ok: item.status === 'PUBLISHED',
      label: 'Status PUBLISHED',
      detail: item.status,
    });

    checks.push({
      ok: Boolean(item.menuItem),
      label: 'Menu linked',
      detail: item.menuItem
        ? `${item.menuItem.parent?.slug ?? '?'}/${item.menuItem.slug}`
        : 'missing',
    });

    for (const field of ['title', 'shortDescription', 'description', 'region', 'locationName', 'periodLabel'] as const) {
      const map = decodeTranslatableText(item[field]);
      const missing = SITE_LOCALE_CODES.filter((code) => !map[code]?.trim());
      checks.push({
        ok: missing.length === 0,
        label: `i18n field: ${field}`,
        detail: missing.length ? `missing ${missing.join(', ')}` : `ok (${SITE_LOCALE_CODES.length})`,
      });
    }

    checks.push({
      ok: Boolean(item.image?.trim()),
      label: 'Cover/image set',
      detail: item.image ?? '',
    });
    checks.push({
      ok: Boolean(item.cardBackgroundImage?.trim()),
      label: 'Card background set',
      detail: item.cardBackgroundImage ?? '',
    });
    checks.push({
      ok: item.showOnMap === true && item.mapType === 'CHURCH' && item.latitude != null && item.longitude != null,
      label: 'Map metadata',
      detail: `show=${item.showOnMap} type=${item.mapType} lat=${item.latitude} lng=${item.longitude} url=${item.mapUrl ?? ''}`,
    });

    const media = parseCultureItemMedia(item.mediaContent);
    const byLocale = parseMediaByLocale(item.mediaContent);

    for (const code of SITE_LOCALE_CODES) {
      const slice = byLocale[code];
      const blocks = slice?.blocks?.filter((b) => b.title || b.body) ?? [];
      checks.push({
        ok: blocks.length >= 2,
        label: `Locale ${code} description blocks`,
        detail: `${blocks.length} blocks`,
      });
    }

    const shared = mediaForLocale(media, byLocale, 'EN');
    checks.push({
      ok: shared.tours.length >= 4,
      label: 'Shared tours count',
      detail: String(shared.tours.length),
    });
    checks.push({
      ok: shared.videos.length >= 2,
      label: 'Shared videos count',
      detail: String(shared.videos.length),
    });
    checks.push({
      ok: shared.gallery.filter((g) => g.kind === 'image' && g.url).length >= 3,
      label: 'Gallery images',
      detail: String(shared.gallery.filter((g) => g.kind === 'image' && g.url).length),
    });
    checks.push({
      ok: shared.gallery.some((g) => g.kind === 'beforeAfter' && g.beforeUrl && g.afterUrl),
      label: 'Before/After gallery item',
    });

    const shortLeft = shared.tours.filter((t) => isSketchfabShortUrl(t.url));
    checks.push({
      ok: shortLeft.length === 0,
      label: 'No unresolved skfb.ly tour URLs',
      detail: shortLeft.length ? shortLeft.map((t) => t.url).join(' | ') : 'clean',
    });

    const embeddable = shared.tours.filter((t) => toTourEmbedSrc(t.url) || t.url.includes('matterport'));
    checks.push({
      ok: embeddable.length === shared.tours.length,
      label: 'All tours have sync-embeddable URLs',
      detail: `${embeddable.length}/${shared.tours.length}`,
    });

    const firstBlockImage = byLocale.EN?.blocks.find((b) => b.image)?.image;
    checks.push({
      ok: Boolean(firstBlockImage),
      label: 'EN block side image',
      detail: firstBlockImage ?? '',
    });

    printReport(checks);
    console.log('\nAdmin URL:');
    console.log(`  /admin/culture-items/${item.id}`);
    console.log('Public URL:');
    console.log(`  /culture/item/${item.slug}`);
  } finally {
    await prisma.$disconnect();
  }
}

function printReport(checks: Check[]): void {
  const failed = checks.filter((c) => !c.ok);
  console.log('\n=== QA Admin data audit ===\n');
  for (const check of checks) {
    const mark = check.ok ? 'PASS' : 'FAIL';
    console.log(`[${mark}] ${check.label}${check.detail ? ` — ${check.detail}` : ''}`);
  }
  console.log(`\nSummary: ${checks.length - failed.length}/${checks.length} passed`);
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
