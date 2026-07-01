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
import {
  mergeLocalizedJsonContent,
  resolveLocalizedJsonContent,
} from '@/lib/i18n/translatable-json-content';
import { isSiteLocaleCode } from '@/lib/i18n/locale-config';
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

  const localeRaw = formData.get('locale')?.toString().toUpperCase() ?? 'EN';
  const locale = isSiteLocaleCode(localeRaw) ? localeRaw : 'EN';
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

  const existing = await prisma.pageContent.findUnique({
    where: { slug },
    select: { content: true },
  });
  const nextContent = mergeLocalizedJsonContent(
    existing?.content ?? null,
    locale,
    parsed as Record<string, unknown>,
  );
  const validationTarget = resolveLocalizedJsonContent(nextContent, 'EN');
  const validationForDefaultLocale = validatePageContentJson(slug, validationTarget);
  if (!validationForDefaultLocale.ok) {
    return { status: 'error', message: `Default locale failed validation: ${validationForDefaultLocale.message}` };
  }

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
