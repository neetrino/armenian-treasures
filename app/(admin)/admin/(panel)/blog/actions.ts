'use server';

import slugify from 'slugify';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { revalidateBlogPostsCache } from '@/lib/cache/revalidation';
import { blogPostSchema } from '@/lib/validation';
import {
  encodeTranslatableText,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';

export interface BlogFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData, existingSlug?: string) {
  const titleI18n = readLocalizedTextFromFormData(formData, 'title');
  const contentI18n = readLocalizedTextFromFormData(formData, 'content');
  const titleRaw = pickDefaultLocaleText(titleI18n);
  const slug = existingSlug ?? slugify(titleRaw, { lower: true, strict: true });
  const publishedAtRaw = formData.get('publishedAt')?.toString() ?? '';

  const parsed = blogPostSchema.safeParse({
    title: titleRaw,
    slug,
    content: pickDefaultLocaleText(contentI18n),
    image: formData.get('image')?.toString() ?? '',
    publishedAt: publishedAtRaw || new Date().toISOString().slice(0, 10),
    order: 0,
    isPublished: formData.get('isPublished') === 'on',
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const basePath = issue.path.join('.') || 'form';
      const path =
        basePath === 'title' || basePath === 'content' ? `${basePath}.EN` : basePath;
      if (!errors[path]) errors[path] = issue.message;
    }
    return { ok: false as const, errors };
  }

  return {
    ok: true as const,
    data: {
      title: encodeTranslatableText(titleI18n),
      slug: parsed.data.slug,
      content: encodeTranslatableText(contentI18n),
      image: parsed.data.image?.trim() ? parsed.data.image : null,
      publishedAt: parsed.data.publishedAt,
      order: parsed.data.order,
      isPublished: parsed.data.isPublished,
    },
  };
}

function revalidate(slug?: string): void {
  revalidateBlogPostsCache(slug ? [slug] : []);
}

export async function createBlogPostAction(_p: BlogFormState, formData: FormData): Promise<BlogFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };

  const existing = await prisma.blogPost.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return {
      status: 'error',
      fieldErrors: { 'title.EN': 'A post with a similar title already exists.' },
      message: 'Duplicate post.',
    };
  }

  await prisma.blogPost.create({ data: parsed.data });
  revalidate(parsed.data.slug);
  return { status: 'success' };
}

export async function updateBlogPostAction(
  id: string,
  _p: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  await requireAdmin();
  const current = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
  if (!current) {
    return { status: 'error', message: 'Post not found.' };
  }

  const parsed = parseForm(formData, current.slug);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };

  const { slug: _slug, order: _order, ...updateData } = parsed.data;
  await prisma.blogPost.update({ where: { id }, data: updateData });
  revalidate(current.slug);
  return { status: 'success' };
}

export async function deleteBlogPostAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    const row = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
    await prisma.blogPost.delete({ where: { id } });
    revalidate(row?.slug);
  });
}
