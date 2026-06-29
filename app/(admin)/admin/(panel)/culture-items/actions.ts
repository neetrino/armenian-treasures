'use server';

import slugify from 'slugify';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { revalidateCultureItemCache } from '@/lib/cache/revalidation';
import {
  cleanupReplacedGalleryImages,
  deleteReplacedManagedImage,
} from '@/lib/uploads/cleanup-replaced-image';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { cultureItemSchema } from '@/lib/validation';
import type {
  ContentStatus,
  CultureItemType,
  MapType,
} from '@prisma/client';

const ITEM_TYPES: CultureItemType[] = [
  'MONUMENT',
  'MUSEUM',
  'PERSON',
  'LEGEND',
  'HISTORY_EVENT',
  'HERITAGE_OBJECT',
  'PUBLICATION',
  'MUSIC',
  'FOOD',
  'DANCE',
  'THEATRE',
  'OTHER',
];

const MAP_TYPES: MapType[] = ['MONASTERY', 'FORTRESS', 'MUSEUM', 'CHURCH', 'ARCHAEOLOGICAL', 'OTHER'];
const STATUSES: ContentStatus[] = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

function asItemType(value: string): CultureItemType {
  return ITEM_TYPES.includes(value as CultureItemType) ? (value as CultureItemType) : 'OTHER';
}

function asMapType(value: string): MapType | null {
  return MAP_TYPES.includes(value as MapType) ? (value as MapType) : null;
}

function asStatus(value: string): ContentStatus {
  return STATUSES.includes(value as ContentStatus) ? (value as ContentStatus) : 'DRAFT';
}

function numberOrNull(value: FormDataEntryValue | null): number | null {
  if (value === null) return null;
  const trimmed = value.toString().trim();
  if (trimmed.length === 0) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

function intOrZero(value: FormDataEntryValue | null): number {
  if (value === null) return 0;
  const n = Number(value.toString());
  return Number.isFinite(n) ? Math.trunc(n) : 0;
}

export interface CultureItemFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData):
  | { ok: true; data: ReturnType<typeof toData> }
  | { ok: false; errors: Record<string, string> } {
  const titleRaw = formData.get('title')?.toString() ?? '';
  const slugRaw = formData.get('slug')?.toString() ?? '';
  const slug = (slugRaw.trim() ? slugRaw : titleRaw).trim();
  const finalSlug = slugify(slug, { lower: true, strict: true });
  const parsed = cultureItemSchema.safeParse({
    title: titleRaw,
    slug: finalSlug,
    description: formData.get('description')?.toString() ?? '',
    shortDescription: formData.get('shortDescription')?.toString() ?? '',
    menuItemId: formData.get('menuItemId')?.toString() ?? '',
    region: formData.get('region')?.toString() ?? '',
    locationName: formData.get('locationName')?.toString() ?? '',
    periodLabel: formData.get('periodLabel')?.toString() ?? '',
    century: numberOrNull(formData.get('century')),
    yearLabel: formData.get('yearLabel')?.toString() ?? '',
    image: formData.get('image')?.toString() ?? '',
    galleryImages: formData
      .getAll('galleryImages')
      .map((value) => value.toString().trim())
      .filter((value) => value.length > 0),
    tourUrl: formData.get('tourUrl')?.toString() ?? '',
    videoUrl: formData.get('videoUrl')?.toString() ?? '',
    latitude: numberOrNull(formData.get('latitude')),
    longitude: numberOrNull(formData.get('longitude')),
    mapType: asMapType(formData.get('mapType')?.toString() ?? ''),
    showOnMap: formData.get('showOnMap') === 'on',
    itemType: asItemType(formData.get('itemType')?.toString() ?? 'OTHER'),
    status: asStatus(formData.get('status')?.toString() ?? 'PUBLISHED'),
    order: intOrZero(formData.get('order')),
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!errors[path]) errors[path] = issue.message;
    }
    return { ok: false, errors };
  }
  return { ok: true, data: toData(parsed.data) };
}

function toData(input: ReturnType<typeof cultureItemSchema.parse>) {
  return {
    title: input.title,
    slug: input.slug,
    description: input.description?.trim() ? input.description : null,
    shortDescription: input.shortDescription?.trim() ? input.shortDescription : null,
    menuItemId: input.menuItemId,
    region: input.region?.trim() ? input.region : null,
    locationName: input.locationName?.trim() ? input.locationName : null,
    periodLabel: input.periodLabel?.trim() ? input.periodLabel : null,
    century: input.century ?? null,
    yearLabel: input.yearLabel?.trim() ? input.yearLabel : null,
    image: input.image?.trim() ? input.image : null,
    galleryImages: input.galleryImages,
    tourUrl: input.tourUrl?.trim() ? input.tourUrl : null,
    videoUrl: input.videoUrl?.trim() ? input.videoUrl : null,
    latitude: input.latitude ?? null,
    longitude: input.longitude ?? null,
    mapType: input.mapType ?? null,
    showOnMap: input.showOnMap,
    itemType: input.itemType,
    status: input.status,
    order: input.order,
  };
}

async function revalidateCultureItem(slugs: string[], menuItemIds: string[] = []): Promise<void> {
  await revalidateCultureItemCache(slugs, menuItemIds);
}

export async function createCultureItemAction(
  _prev: CultureItemFormState,
  formData: FormData,
): Promise<CultureItemFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) {
    return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  }
  const existing = await prisma.cultureItem.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return {
      status: 'error',
      fieldErrors: { slug: 'An item with this slug already exists.' },
      message: 'Slug must be unique.',
    };
  }
  await prisma.cultureItem.create({ data: parsed.data });
  await revalidateCultureItem([parsed.data.slug], [parsed.data.menuItemId]);
  return { status: 'success' };
}

export async function updateCultureItemAction(
  id: string,
  _prev: CultureItemFormState,
  formData: FormData,
): Promise<CultureItemFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) {
    return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  }
  const current = await prisma.cultureItem.findUnique({
    where: { id },
    select: { slug: true, menuItemId: true, image: true, galleryImages: true },
  });
  const existing = await prisma.cultureItem.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) {
    return {
      status: 'error',
      fieldErrors: { slug: 'An item with this slug already exists.' },
      message: 'Slug must be unique.',
    };
  }
  await prisma.cultureItem.update({ where: { id }, data: parsed.data });

  await deleteReplacedManagedImage(current?.image, parsed.data.image);
  await cleanupReplacedGalleryImages(current?.galleryImages ?? [], parsed.data.galleryImages);

  const slugs = new Set<string>([parsed.data.slug]);
  if (current?.slug) slugs.add(current.slug);
  const menuItemIds = [parsed.data.menuItemId];
  if (current?.menuItemId) menuItemIds.push(current.menuItemId);
  await revalidateCultureItem([...slugs], menuItemIds);
  return { status: 'success' };
}

export async function deleteCultureItemAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    const item = await prisma.cultureItem.findUnique({
      where: { id },
      select: { slug: true, menuItemId: true },
    });
    if (!item) return;
    await prisma.cultureItem.delete({ where: { id } });
    await revalidateCultureItem(item.slug ? [item.slug] : [], item.menuItemId ? [item.menuItemId] : []);
  });
}

export async function toggleCultureItemMapAction(id: string, showOnMap: boolean): Promise<void> {
  await requireAdmin();
  const item = await prisma.cultureItem.findUnique({
    where: { id },
    select: { slug: true, menuItemId: true },
  });
  await prisma.cultureItem.update({ where: { id }, data: { showOnMap } });
  await revalidateCultureItem(item?.slug ? [item.slug] : [], item?.menuItemId ? [item.menuItemId] : []);
}
