'use server';

import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import {
  revalidateCultureCatalogPathForMenuItem,
  revalidateCultureItemCache,
  revalidateCultureMenuCache,
} from '@/lib/cache/revalidation';
import { prisma } from '@/lib/db';
import {
  cleanupReplacedGalleryImages,
  deleteReplacedManagedImage,
} from '@/lib/uploads/cleanup-replaced-image';
import { catalogContentFromFormFields } from '@/lib/types/culture-catalog-content';
import {
  encodeTranslatableText,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';
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

const optionalHexColor = z
  .string()
  .trim()
  .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, 'Must be a hex color like #0f1419')
  .optional()
  .or(z.literal(''));

const catalogEntrySchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().min(1, 'Description is required').max(5000),
  region: optionalText(120),
  periodLabel: optionalText(80),
  image: optionalText(500),
  cardBackgroundColor: optionalHexColor,
  cardBackgroundImage: optionalText(500),
  tourUrl: optionalText(500),
  order: z.coerce.number().int().min(0),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

function readEntryFields(formData: FormData) {
  const titleI18n = readLocalizedTextFromFormData(formData, 'title');
  const descriptionI18n = readLocalizedTextFromFormData(formData, 'description');
  const regionI18n = readLocalizedTextFromFormData(formData, 'region');
  const periodLabelI18n = readLocalizedTextFromFormData(formData, 'periodLabel');
  return {
    title: pickDefaultLocaleText(titleI18n),
    description: pickDefaultLocaleText(descriptionI18n),
    region: pickDefaultLocaleText(regionI18n),
    periodLabel: pickDefaultLocaleText(periodLabelI18n),
    image: formData.get('image')?.toString() ?? '',
    cardBackgroundColor: formData.get('cardBackgroundColor')?.toString() ?? '',
    cardBackgroundImage: formData.get('cardBackgroundImage')?.toString() ?? '',
    tourUrl: formData.get('tourUrl')?.toString() ?? '',
    order: formData.get('order')?.toString() ?? '0',
    status: formData.get('status')?.toString() ?? 'PUBLISHED',
    titleI18n,
    descriptionI18n,
    regionI18n,
    periodLabelI18n,
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

  const fields = readEntryFields(formData);
  const parsed = catalogEntrySchema.safeParse(fields);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
                const rawKey = issue.path[0]?.toString();
                const key =
                  rawKey === 'title' ||
                  rawKey === 'description' ||
                  rawKey === 'region' ||
                  rawKey === 'periodLabel'
                    ? `${rawKey}.EN`
                    : rawKey;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors };
  }

  const existing = await prisma.cultureItem.findFirst({
    where: { id: entryId, menuItemId },
    select: { id: true, slug: true, cardBackgroundImage: true },
  });
  if (!existing) {
    return { status: 'error', message: 'Entry not found on this page.' };
  }

  const data = parsed.data;
  await prisma.cultureItem.update({
    where: { id: entryId },
    data: {
      title: encodeTranslatableText(fields.titleI18n),
      description: encodeTranslatableText(fields.descriptionI18n),
      region: encodeTranslatableText(fields.regionI18n) || null,
      periodLabel: encodeTranslatableText(fields.periodLabelI18n) || null,
      image: data.image || null,
      cardBackgroundColor: data.cardBackgroundColor || null,
      cardBackgroundImage: data.cardBackgroundImage || null,
      tourUrl: data.tourUrl || null,
      order: data.order,
      status: data.status as ContentStatus,
    },
  });

  await deleteReplacedManagedImage(existing.cardBackgroundImage, data.cardBackgroundImage || null);

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

  const fields = readEntryFields(formData);
  const parsed = catalogEntrySchema.safeParse(fields);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const rawKey = issue.path[0]?.toString();
      const key =
        rawKey === 'title' ||
        rawKey === 'description' ||
        rawKey === 'region' ||
        rawKey === 'periodLabel'
          ? `${rawKey}.EN`
          : rawKey;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors };
  }

  const menuItem = await prisma.cultureMenuItem.findUnique({
    where: { id: menuItemId },
    select: { id: true, routeType: true },
  });
  if (!menuItem) {
    return { status: 'error', message: 'This page cannot accept grid entries.' };
  }
  const subcategoryCount =
    menuItem.routeType === 'CATEGORY'
      ? await prisma.cultureMenuItem.count({
          where: { parentId: menuItem.id, routeType: 'SUBCATEGORY' },
        })
      : 0;
  const supportsGridEntries =
    menuItem.routeType === 'SUBCATEGORY' ||
    (menuItem.routeType === 'CATEGORY' && subcategoryCount === 0);
  if (!supportsGridEntries) {
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
      title: encodeTranslatableText(fields.titleI18n),
      slug,
      description: encodeTranslatableText(fields.descriptionI18n),
      shortDescription: encodeTranslatableText(fields.descriptionI18n),
      menuItemId,
      region: encodeTranslatableText(fields.regionI18n) || null,
      periodLabel: encodeTranslatableText(fields.periodLabelI18n) || null,
      image: data.image || null,
      cardBackgroundColor: data.cardBackgroundColor || null,
      cardBackgroundImage: data.cardBackgroundImage || null,
      tourUrl: data.tourUrl || null,
      order: data.order,
      status: data.status as ContentStatus,
      itemType: 'MONUMENT',
    },
  });

  await revalidateCatalogEntryPaths(menuItemId, menuPath, slug);

  return { status: 'success', message: `“${data.title}” added to the grid.` };
}

export async function deleteCultureCatalogEntryAction(
  entryId: string,
  menuItemId: string,
  menuPath: string,
): Promise<AdminDeleteResult> {
  await requireAdmin();

  return runAdminDelete(async () => {
    const entry = await prisma.cultureItem.findFirst({
      where: { id: entryId, menuItemId },
      select: {
        id: true,
        slug: true,
        image: true,
        cardBackgroundImage: true,
        galleryImages: true,
      },
    });
    if (!entry) {
      throw new Error('Entry not found.');
    }

    await prisma.cultureItem.delete({ where: { id: entry.id } });
    await deleteReplacedManagedImage(entry.image, null);
    await deleteReplacedManagedImage(entry.cardBackgroundImage, null);
    await cleanupReplacedGalleryImages(entry.galleryImages ?? [], []);
    await revalidateCatalogEntryPaths(menuItemId, menuPath, entry.slug);
  });
}
