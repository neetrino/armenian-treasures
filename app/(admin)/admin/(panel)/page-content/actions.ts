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
import { isSiteLocaleCode, SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import type { Prisma } from '@prisma/client';

export interface PageContentFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseAllLocalesJson(raw: string): Partial<Record<SiteLocaleCode, Record<string, unknown>>> | null {
  if (!raw.trim()) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isJsonObject(parsed)) return null;
    const map: Partial<Record<SiteLocaleCode, Record<string, unknown>>> = {};
    for (const code of SITE_LOCALE_CODES) {
      const entry = parsed[code];
      if (isJsonObject(entry)) map[code] = entry;
    }
    return map;
  } catch {
    return null;
  }
}

export async function savePageContentAction(
  slug: PageContentSlug,
  _prev: PageContentFormState,
  formData: FormData,
): Promise<PageContentFormState> {
  await requireAdmin();

  const localeRaw = formData.get('locale')?.toString().toUpperCase() ?? 'EN';
  const locale = isSiteLocaleCode(localeRaw) ? localeRaw : 'EN';
  const allLocales = parseAllLocalesJson(formData.get('allLocalesJson')?.toString() ?? '');
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

  const localesToSave: Array<[SiteLocaleCode, Record<string, unknown>]> = allLocales
    ? (Object.entries(allLocales) as Array<[SiteLocaleCode, Record<string, unknown>]>)
    : [[locale, parsed as Record<string, unknown>]];

  for (const [code, content] of localesToSave) {
    const validated = validatePageContentJson(slug, content);
    if (!validated.ok) {
      return { status: 'error', message: `${code}: ${validated.message}` };
    }
  }

  const existing = await prisma.pageContent.findUnique({
    where: { slug },
    select: { content: true },
  });

  let nextContent: unknown = existing?.content ?? null;
  for (const [code, content] of localesToSave) {
    nextContent = mergeLocalizedJsonContent(nextContent, code, content);
  }

  const validationTarget = resolveLocalizedJsonContent(nextContent, 'EN');
  const validationForDefaultLocale = validatePageContentJson(slug, validationTarget);
  if (!validationForDefaultLocale.ok) {
    return {
      status: 'error',
      message: `Default locale failed validation: ${validationForDefaultLocale.message}`,
    };
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

  return { status: 'success', message: 'Page content saved for all edited languages.' };
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
