'use server';

import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/require-admin';
import {
  revalidateCultureCatalogPathForMenuItem,
  revalidateCultureItemCache,
  revalidateCultureMenuCache,
} from '@/lib/cache/revalidation';
import { prisma } from '@/lib/db';
import { catalogContentFromFormFields } from '@/lib/types/culture-catalog-content';
import type { ContentStatus, Prisma } from '@prisma/client';

export interface CultureCatalogPageFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export interface CultureCatalogEntryFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''));

const catalogEntrySchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().min(1, 'Description is required').max(5000),
  region: optionalText(120),
  periodLabel: optionalText(80),
  image: optionalText(500),
  tourUrl: optionalText(500),
  order: z.coerce.number().int().min(0),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

function readEntryFields(formData: FormData) {
  return {
    title: formData.get('title')?.toString() ?? '',
    description: formData.get('description')?.toString() ?? '',
    region: formData.get('region')?.toString() ?? '',
    periodLabel: formData.get('periodLabel')?.toString() ?? '',
    image: formData.get('image')?.toString() ?? '',
    tourUrl: formData.get('tourUrl')?.toString() ?? '',
    order: formData.get('order')?.toString() ?? '0',
    status: formData.get('status')?.toString() ?? 'PUBLISHED',
  };
}

async function revalidateCatalogEntryPaths(menuItemId: string, menuPath: string, slug: string): Promise<void> {
  await revalidateCultureMenuCache();
  await revalidateCultureCatalogPathForMenuItem(menuItemId);
  await revalidateCultureItemCache([slug], [menuItemId]);
  revalidatePath(`/admin/culture-pages/${menuPath}`);
}

export async function saveCultureCatalogPageAction(
  menuItemId: string,
  menuPath: string,
  _prev: CultureCatalogPageFormState,
  formData: FormData,
): Promise<CultureCatalogPageFormState> {
  await requireAdmin();

  const catalogContent = catalogContentFromFormFields(formData);
  if (!catalogContent) {
    return { status: 'error', message: 'Please fill in at least one content field before saving.' };
  }

  const item = await prisma.cultureMenuItem.findUnique({
    where: { id: menuItemId },
    select: { id: true, routeType: true },
  });

  if (!item) {
    return { status: 'error', message: 'Culture page not found.' };
  }

  if (item.routeType !== 'CATEGORY' && item.routeType !== 'SUBCATEGORY') {
    return { status: 'error', message: 'This menu item does not support catalog page content.' };
  }

  await prisma.cultureMenuItem.update({
    where: { id: menuItemId },
    data: {
      catalogContent: catalogContent as Prisma.InputJsonValue,
    },
  });

  await revalidateCultureMenuCache();
  await revalidateCultureCatalogPathForMenuItem(menuItemId);
  revalidatePath(`/admin/culture-pages/${menuPath}`);

  return {
    status: 'success',
    message: `Culture page “${menuPath}” saved.`,
  };
}

export async function saveCultureCatalogEntryAction(
  entryId: string,
  menuItemId: string,
  menuPath: string,
  _prev: CultureCatalogEntryFormState,
  formData: FormData,
): Promise<CultureCatalogEntryFormState> {
  await requireAdmin();

  const parsed = catalogEntrySchema.safeParse(readEntryFields(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors };
  }

  const existing = await prisma.cultureItem.findFirst({
    where: { id: entryId, menuItemId },
    select: { id: true, slug: true },
  });
  if (!existing) {
    return { status: 'error', message: 'Entry not found on this page.' };
  }

  const data = parsed.data;
  await prisma.cultureItem.update({
    where: { id: entryId },
    data: {
      title: data.title,
      description: data.description,
      region: data.region || null,
      periodLabel: data.periodLabel || null,
      image: data.image || null,
      tourUrl: data.tourUrl || null,
      order: data.order,
      status: data.status as ContentStatus,
    },
  });

  await revalidateCatalogEntryPaths(menuItemId, menuPath, existing.slug);

  return { status: 'success', message: `“${data.title}” saved.` };
}

export async function createCultureCatalogEntryAction(
  menuItemId: string,
  menuPath: string,
  _prev: CultureCatalogEntryFormState,
  formData: FormData,
): Promise<CultureCatalogEntryFormState> {
  await requireAdmin();

  const parsed = catalogEntrySchema.safeParse(readEntryFields(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors };
  }

  const menuItem = await prisma.cultureMenuItem.findUnique({
    where: { id: menuItemId },
    select: { id: true, routeType: true },
  });
  if (!menuItem || menuItem.routeType !== 'SUBCATEGORY') {
    return { status: 'error', message: 'This page cannot accept grid entries.' };
  }

  const data = parsed.data;
  const baseSlug = slugify(data.title, { lower: true, strict: true });
  let slug = baseSlug;
  let suffix = 2;
  while (await prisma.cultureItem.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  await prisma.cultureItem.create({
    data: {
      title: data.title,
      slug,
      description: data.description,
      shortDescription: data.description.slice(0, 240),
      menuItemId,
      region: data.region || null,
      periodLabel: data.periodLabel || null,
      image: data.image || null,
      tourUrl: data.tourUrl || null,
      order: data.order,
      status: data.status as ContentStatus,
      itemType: 'MONUMENT',
    },
  });

  await revalidateCatalogEntryPaths(menuItemId, menuPath, slug);

  return { status: 'success', message: `“${data.title}” added to the grid.` };
}
