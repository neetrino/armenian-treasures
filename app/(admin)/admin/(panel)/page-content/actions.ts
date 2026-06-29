'use server';

import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidatePageContentSlug } from '@/lib/cache/revalidation';
import { prisma } from '@/lib/db';
import {
  getDefaultPageContent,
  PAGE_CONTENT_TITLES,
  type PageContentSlug,
} from '@/lib/types/page-content';
import { validatePageContentJson } from '@/lib/validation/page-content';
import type { Prisma } from '@prisma/client';
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

  const validated = validatePageContentJson(slug, parsed);
  if (!validated.ok) {
    return { status: 'error', message: validated.message };
  }

  await prisma.pageContent.upsert({
    where: { slug },
    create: {
      slug,
      title: PAGE_CONTENT_TITLES[slug],
      content: validated.data as Prisma.InputJsonValue,
    },
    update: {
      title: PAGE_CONTENT_TITLES[slug],
      content: validated.data as Prisma.InputJsonValue,
    },
  });

  revalidatePageContentSlug(slug);

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
  revalidatePageContentSlug(slug);
}
