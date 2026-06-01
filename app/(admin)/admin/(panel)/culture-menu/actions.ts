'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import slugify from 'slugify';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { cultureMenuItemSchema, cultureMenuReorderSchema } from '@/lib/validation';
import type { MenuRouteType } from '@prisma/client';

function toSlug(value: string): string {
  return slugify(value, { lower: true, strict: true });
}

function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

export interface MenuFormState {
  status: 'idle' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

const VALID_ROUTE_TYPES: MenuRouteType[] = [
  'CATEGORY',
  'SUBCATEGORY',
  'SUBCATEGORY_FORM',
  'PROJECT_SUBMIT_FORM',
  'CUSTOM_URL',
];

function parseRouteType(value: string): MenuRouteType {
  return VALID_ROUTE_TYPES.includes(value as MenuRouteType)
    ? (value as MenuRouteType)
    : 'CATEGORY';
}

async function ensureSlugUnique(parentId: string | null, slug: string, ignoreId?: string): Promise<boolean> {
  const existing = await prisma.cultureMenuItem.findFirst({
    where: { parentId, slug },
  });
  return !existing || existing.id === ignoreId;
}

function parseForm(formData: FormData): { ok: true; data: ReturnType<typeof toData> } | { ok: false; errors: Record<string, string> } {
  const titleRaw = formData.get('title')?.toString() ?? '';
  const slugRaw = formData.get('slug')?.toString() ?? '';
  const finalSlug = slugRaw.trim().length > 0 ? toSlug(slugRaw) : toSlug(titleRaw);
  const parsed = cultureMenuItemSchema.safeParse({
    title: titleRaw,
    slug: finalSlug,
    description: formData.get('description')?.toString() ?? '',
    parentId: emptyToNull(formData.get('parentId')?.toString() ?? ''),
    order: Number(formData.get('order') ?? 0),
    isActive: formData.get('isActive') === 'on',
    image: formData.get('image')?.toString() ?? '',
    routeType: parseRouteType(formData.get('routeType')?.toString() ?? 'CATEGORY'),
    customUrl: emptyToNull(formData.get('customUrl')?.toString() ?? ''),
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

function toData(input: ReturnType<typeof cultureMenuItemSchema.parse>) {
  return {
    title: input.title,
    slug: input.slug,
    description: input.description?.trim() ? input.description.trim() : null,
    parentId: input.parentId ?? null,
    order: input.order,
    isActive: input.isActive,
    image: input.image?.trim() ? input.image.trim() : null,
    routeType: input.routeType,
    customUrl: input.customUrl?.trim() ? input.customUrl.trim() : null,
  };
}

function revalidate(): void {
  revalidateTag('culture-menu');
  revalidatePath('/');
  revalidatePath('/culture');
  revalidatePath('/admin/culture-menu');
}

export async function createMenuItemAction(
  _prev: MenuFormState,
  formData: FormData,
): Promise<MenuFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) {
    return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  }
  const data = parsed.data;
  const unique = await ensureSlugUnique(data.parentId, data.slug);
  if (!unique) {
    return {
      status: 'error',
      fieldErrors: { slug: 'A sibling with this slug already exists.' },
      message: 'Slug must be unique within siblings.',
    };
  }
  await prisma.cultureMenuItem.create({ data });
  revalidate();
  redirect('/admin/culture-menu');
}

export async function updateMenuItemAction(
  id: string,
  _prev: MenuFormState,
  formData: FormData,
): Promise<MenuFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) {
    return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  }
  const data = parsed.data;
  if (data.parentId === id) {
    return {
      status: 'error',
      fieldErrors: { parentId: 'An item cannot be its own parent.' },
      message: 'Invalid parent.',
    };
  }
  const unique = await ensureSlugUnique(data.parentId, data.slug, id);
  if (!unique) {
    return {
      status: 'error',
      fieldErrors: { slug: 'A sibling with this slug already exists.' },
      message: 'Slug must be unique within siblings.',
    };
  }
  await prisma.cultureMenuItem.update({ where: { id }, data });
  revalidate();
  redirect('/admin/culture-menu');
}

export async function deleteMenuItemAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.cultureMenuItem.delete({ where: { id } });
  revalidate();
}

export async function toggleMenuItemAction(id: string, isActive: boolean): Promise<void> {
  await requireAdmin();
  await prisma.cultureMenuItem.update({ where: { id }, data: { isActive } });
  revalidate();
}

export async function moveMenuItemAction(id: string, direction: 'up' | 'down'): Promise<void> {
  await requireAdmin();
  const target = await prisma.cultureMenuItem.findUnique({ where: { id } });
  if (!target) return;
  const siblings = await prisma.cultureMenuItem.findMany({
    where: { parentId: target.parentId },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
  const index = siblings.findIndex((s) => s.id === id);
  if (index === -1) return;
  const swapIndex = direction === 'up' ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= siblings.length) return;
  const a = siblings[index];
  const b = siblings[swapIndex];
  if (!a || !b) return;
  await prisma.$transaction([
    prisma.cultureMenuItem.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.cultureMenuItem.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);
  revalidate();
}

export type ReorderMenuResult = { ok: true } | { ok: false; message: string };

export async function reorderMenuSiblingsAction(
  parentId: string | null,
  orderedIds: string[],
): Promise<ReorderMenuResult> {
  await requireAdmin();
  const parsed = cultureMenuReorderSchema.safeParse({ parentId, order: orderedIds });
  if (!parsed.success) {
    return { ok: false, message: 'Invalid reorder payload.' };
  }

  const siblings = await prisma.cultureMenuItem.findMany({
    where: { parentId },
    select: { id: true },
  });
  const siblingIds = new Set(siblings.map((s) => s.id));
  if (orderedIds.length !== siblings.length || !orderedIds.every((id) => siblingIds.has(id))) {
    return { ok: false, message: 'Order must include all siblings at this level.' };
  }

  try {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.cultureMenuItem.update({ where: { id }, data: { order: index } }),
      ),
    );
    revalidate();
    return { ok: true };
  } catch {
    return { ok: false, message: 'Could not save order. Please try again.' };
  }
}
