import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { UNIVERSAL_PAGE_HERO_IMAGE } from '@/lib/page-content-images';
import { PAGE_CONTENT_SLUGS, PAGE_CONTENT_TITLES, getDefaultPageContent, type PageContentSlug } from '@/lib/types/page-content';
import {
  isLocalizedJsonContent,
} from '@/lib/i18n/translatable-json-content';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import { parseMenuCatalogContent } from '@/lib/types/culture-catalog-content';
import { uploadRasterImage } from '@/lib/storage/raster-r2';

const DEFAULT_SOURCE = resolve(
  process.cwd(),
  'public/images/hero/universal-page-hero.webp',
);

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function setHeroOnPageContent(
  slug: PageContentSlug,
  content: unknown,
  heroPath: string,
): unknown {
  const defaults = getDefaultPageContent(slug);

  if (isLocalizedJsonContent(content)) {
    const values = { ...content.values };
    for (const locale of SITE_LOCALE_CODES) {
      const entry = values[locale as SiteLocaleCode];
      if (isJsonObject(entry)) {
        values[locale as SiteLocaleCode] = { ...defaults, ...entry, heroImage: heroPath };
      }
    }
    const locales = SITE_LOCALE_CODES.filter((code) => isJsonObject(values[code]));
    if (locales.length === 1 && locales[0] === 'EN') {
      return { ...defaults, ...(values.EN ?? {}), heroImage: heroPath };
    }
    return { __at_i18n_v1: true, values };
  }

  if (isJsonObject(content)) {
    return { ...defaults, ...content, heroImage: heroPath };
  }

  return { ...defaults, heroImage: heroPath };
}

function setHeroOnCatalogContent(
  catalogContent: unknown,
  heroPath: string,
): Prisma.InputJsonValue {
  const parsed = parseMenuCatalogContent(catalogContent) ?? {};
  return {
    ...parsed,
    heroImage: heroPath,
  } as Prisma.InputJsonValue;
}

async function publishHeroAsset(sourcePath: string, heroPath: string): Promise<void> {
  const key = heroPath.replace(/^\//, '');
  const buffer = await readFile(sourcePath);
  await uploadRasterImage({
    key,
    buffer,
    contentType: 'image/webp',
  });
  console.log(`✓ Uploaded ${key} to R2`);
}

async function main(): Promise<void> {
  const sourceArg = process.argv.find((arg) => arg.startsWith('--source='));
  const sourcePath = sourceArg ? resolve(sourceArg.slice('--source='.length)) : DEFAULT_SOURCE;
  const heroPath = UNIVERSAL_PAGE_HERO_IMAGE;

  await publishHeroAsset(sourcePath, heroPath);

  const homeUpdates = await prisma.homeContent.updateMany({
    data: {
      heroImage: heroPath,
      heroMobileImage: heroPath,
    },
  });

  const aboutUpdates = await prisma.aboutContent.updateMany({
    data: { heroImage: heroPath },
  });

  let pageUpdates = 0;
  for (const slug of PAGE_CONTENT_SLUGS) {
    const existing = await prisma.pageContent.findUnique({
      where: { slug },
      select: { content: true },
    });
    const nextContent = setHeroOnPageContent(slug, existing?.content ?? null, heroPath);
    await prisma.pageContent.upsert({
      where: { slug },
      create: {
        slug,
        title: PAGE_CONTENT_TITLES[slug],
        content: nextContent as Prisma.InputJsonValue,
      },
      update: {
        title: PAGE_CONTENT_TITLES[slug],
        content: nextContent as Prisma.InputJsonValue,
      },
    });
    pageUpdates += 1;
  }

  const catalogMenuItems = await prisma.cultureMenuItem.findMany({
    where: { routeType: { in: ['CATEGORY', 'SUBCATEGORY'] } },
    select: { id: true, slug: true, catalogContent: true },
  });

  let cultureUpdates = 0;
  for (const item of catalogMenuItems) {
    await prisma.cultureMenuItem.update({
      where: { id: item.id },
      data: {
        catalogContent: setHeroOnCatalogContent(item.catalogContent, heroPath),
      },
    });
    cultureUpdates += 1;
  }

  console.log('Global hero banner applied.');
  console.log(`  Asset: ${heroPath}`);
  console.log(`  HomeContent rows: ${homeUpdates.count}`);
  console.log(`  AboutContent rows: ${aboutUpdates.count}`);
  console.log(`  PageContent slugs: ${pageUpdates}`);
  console.log(`  Culture catalog pages: ${cultureUpdates}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
