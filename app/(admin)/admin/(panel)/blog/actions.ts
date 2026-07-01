'use server';

import slugify from 'slugify';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { revalidateBlogPostsCache } from '@/lib/cache/revalidation';
import { blogPostSchema } from '@/lib/validation';

export interface BlogFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData, existingSlug?: string) {
  const titleRaw = formData.get('title')?.toString() ?? '';
  const slug = existingSlug ?? slugify(titleRaw, { lower: true, strict: true });
  const publishedAtRaw = formData.get('publishedAt')?.toString() ?? '';

  const parsed = blogPostSchema.safeParse({
    title: titleRaw,
    slug,
    content: formData.get('content')?.toString() ?? '',
    image: formData.get('image')?.toString() ?? '',
    publishedAt: publishedAtRaw || new Date().toISOString().slice(0, 10),
    order: 0,
    isPublished: formData.get('isPublished') === 'on',
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!errors[path]) errors[path] = issue.message;
    }
    return { ok: false as const, errors };
  }

  return {
    ok: true as const,
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      content: parsed.data.content,
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
      fieldErrors: { title: 'A post with a similar title already exists.' },
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
