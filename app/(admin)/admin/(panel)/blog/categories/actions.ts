'use server';

import slugify from 'slugify';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { revalidateBlogPostsCache } from '@/lib/cache/revalidation';
import { blogCategorySchema } from '@/lib/validation';
import {
  encodeTranslatableText,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';

export interface BlogCategoryFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
  itemId?: string;
}

function mapSchemaErrors(issues: { path: (string | number)[]; message: string }[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const path = issue.path.join('.') || 'form';
    if (!errors[path]) errors[path] = issue.message;
  }
  return errors;
}

function normalizeSlug(raw: string, titleFallback: string): string {
  const fromField = slugify(raw.trim(), { lower: true, strict: true });
  if (fromField) return fromField;
  return slugify(titleFallback, { lower: true, strict: true });
}

function parseForm(formData: FormData) {
  const titleI18n = readLocalizedTextFromFormData(formData, 'title');
  const titleRaw = pickDefaultLocaleText(titleI18n);
  const slug = normalizeSlug(formData.get('slug')?.toString() ?? '', titleRaw);
  const orderRaw = Number(formData.get('order')?.toString() ?? '0');

  const parsed = blogCategorySchema.safeParse({
    title: titleRaw,
    slug,
    order: Number.isFinite(orderRaw) ? Math.max(0, Math.trunc(orderRaw)) : 0,
  });

  if (!parsed.success) {
    return { ok: false as const, errors: mapSchemaErrors(parsed.error.issues) };
  }

  return {
    ok: true as const,
    data: {
      title: encodeTranslatableText(titleI18n),
      slug: parsed.data.slug,
      order: parsed.data.order,
    },
  };
}

export async function createBlogCategoryAction(
  _p: BlogCategoryFormState,
  formData: FormData,
): Promise<BlogCategoryFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };

  const existing = await prisma.blogCategory.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return {
      status: 'error',
      fieldErrors: { slug: 'A category with this slug already exists.' },
      message: 'Duplicate slug.',
    };
  }

  const created = await prisma.blogCategory.create({ data: parsed.data });
  revalidateBlogPostsCache();
  return { status: 'success', itemId: created.id };
}

export async function updateBlogCategoryAction(
  id: string,
  _p: BlogCategoryFormState,
  formData: FormData,
): Promise<BlogCategoryFormState> {
  await requireAdmin();
  const current = await prisma.blogCategory.findUnique({ where: { id }, select: { slug: true } });
  if (!current) {
    return { status: 'error', message: 'Category not found.' };
  }

  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };

  if (parsed.data.slug !== current.slug) {
    const existing = await prisma.blogCategory.findUnique({ where: { slug: parsed.data.slug } });
    if (existing) {
      return {
        status: 'error',
        fieldErrors: { slug: 'A category with this slug already exists.' },
        message: 'Duplicate slug.',
      };
    }
  }

  await prisma.blogCategory.update({ where: { id }, data: parsed.data });
  revalidateBlogPostsCache();
  return { status: 'success', itemId: id };
}

export async function deleteBlogCategoryAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    await prisma.blogCategory.delete({ where: { id } });
    revalidateBlogPostsCache();
  });
}
