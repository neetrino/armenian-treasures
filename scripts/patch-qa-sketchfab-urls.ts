import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { Prisma } from '@prisma/client';

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

async function main(): Promise<void> {
  await loadDotEnv();
  const { prisma } = await import('@/lib/db');
  const FULL =
    'https://sketchfab.com/3d-models/st-hripsime-church-khndzoresk-old-ef898f47ad45493aa3baf47d206b5762';

  try {
    const item = await prisma.cultureItem.findUnique({ where: { slug: 'qa-i18n-full-demo' } });
    if (!item?.mediaContent || typeof item.mediaContent !== 'object' || Array.isArray(item.mediaContent)) {
      throw new Error('QA item mediaContent missing');
    }

    const media = structuredClone(item.mediaContent) as Prisma.JsonObject;

    const patchTours = (tours: Prisma.JsonValue | undefined): Prisma.JsonValue | undefined => {
      if (!Array.isArray(tours)) return tours;
      return tours.map((tour) => {
        if (!tour || typeof tour !== 'object' || Array.isArray(tour)) return tour;
        const row = tour as Prisma.JsonObject;
        if (typeof row.url === 'string' && (row.url.includes('skfb.ly') || row.url.includes('/s/'))) {
          return { ...row, url: FULL };
        }
        return row;
      });
    };

    media.tours = patchTours(media.tours);
    if (media.byLocale && typeof media.byLocale === 'object' && !Array.isArray(media.byLocale)) {
      const byLocale = media.byLocale as Prisma.JsonObject;
      for (const code of Object.keys(byLocale)) {
        const slice = byLocale[code];
        if (!slice || typeof slice !== 'object' || Array.isArray(slice)) continue;
        const nextSlice = { ...(slice as Prisma.JsonObject) };
        nextSlice.tours = patchTours(nextSlice.tours);
        byLocale[code] = nextSlice;
      }
      media.byLocale = byLocale;
    }

    await prisma.cultureItem.update({
      where: { slug: 'qa-i18n-full-demo' },
      data: { mediaContent: media },
    });
    console.log('✓ QA Sketchfab tours updated to full model URL');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
