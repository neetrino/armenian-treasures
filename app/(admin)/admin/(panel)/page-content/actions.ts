'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import {
  getDefaultPageContent,
  PAGE_CONTENT_TITLES,
  type PageContentSlug,
} from '@/lib/types/page-content';

export interface PageContentFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export async function savePageContentAction(
  slug: PageContentSlug,
  _prev: PageContentFormState,
  formData: FormData,
): Promise<PageContentFormState> {
  await requireAdmin();

  const raw = formData.get('contentJson')?.toString() ?? '';
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { status: 'error', message: 'Invalid JSON. Please fix syntax and try again.' };
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return { status: 'error', message: 'Content must be a JSON object.' };
  }

  await prisma.pageContent.upsert({
    where: { slug },
    create: {
      slug,
      title: PAGE_CONTENT_TITLES[slug],
      content: parsed as Prisma.InputJsonValue,
    },
    update: {
      title: PAGE_CONTENT_TITLES[slug],
      content: parsed as Prisma.InputJsonValue,
    },
  });

  revalidateTag(`page-content-${slug}`, 'max');
  revalidateTag('page-content', 'max');

  const paths: Record<PageContentSlug, string[]> = {
    'donation-page': ['/donate'],
    'partnership-page': ['/partnership'],
    'cultural-portal-page': ['/culture'],
    khndzoresk: ['/khndzoresk'],
    'khachaturian-museum': ['/khachaturian-museum'],
    'national-gallery-armenia': ['/national-gallery-armenia'],
  };

  for (const path of paths[slug]) {
    revalidatePath(path);
  }
  revalidatePath(`/admin/page-content/${slug}`);

  return { status: 'success', message: 'Page content saved.' };
}

export async function resetPageContentAction(slug: PageContentSlug): Promise<void> {
  await requireAdmin();
  const content = getDefaultPageContent(slug) as Prisma.InputJsonValue;
  await prisma.pageContent.upsert({
    where: { slug },
    create: { slug, title: PAGE_CONTENT_TITLES[slug], content },
    update: { title: PAGE_CONTENT_TITLES[slug], content },
  });
  revalidateTag(`page-content-${slug}`, 'max');
  revalidateTag('page-content', 'max');
}
