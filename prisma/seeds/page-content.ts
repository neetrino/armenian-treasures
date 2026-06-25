import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import {
  getDefaultPageContent,
  PAGE_CONTENT_SLUGS,
  PAGE_CONTENT_TITLES,
  type PageContentSlug,
} from '@/lib/types/page-content';

export async function seedPageContent(): Promise<void> {
  for (const slug of PAGE_CONTENT_SLUGS) {
    const content = getDefaultPageContent(slug) as Prisma.InputJsonValue;
    await prisma.pageContent.upsert({
      where: { slug },
      update: { title: PAGE_CONTENT_TITLES[slug], content },
      create: {
        slug,
        title: PAGE_CONTENT_TITLES[slug],
        content,
      },
    });
  }
  console.log('✓ Page content ready');
}

export async function listPageContentSlugs(): Promise<PageContentSlug[]> {
  return [...PAGE_CONTENT_SLUGS];
}
