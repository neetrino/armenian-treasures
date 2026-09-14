'use server';

import { Prisma } from '@prisma/client';
import slugify from 'slugify';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { parseFeaturedHomeFields } from '@/lib/admin/featured-home-fields';
import { revalidateBlogPostsCache } from '@/lib/cache/revalidation';
import { persistBlogPostFeaturedHome } from '@/lib/queries/featured-blog-sql';
import { blogPostSchema } from '@/lib/validation';
import {
  encodeDescriptionHtmlFromBlocks,
  flattenGalleryFromBlocks,
  parseBlogContentBlocks,
  serializeBlogContentBlocks,
} from '@/lib/blog-content-blocks';
import {
  encodeTranslatableText,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';

export interface BlogFormState {
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

async function parseForm(formData: FormData) {
  const titleI18n = readLocalizedTextFromFormData(formData, 'title');
  const shortDescriptionI18n = readLocalizedTextFromFormData(formData, 'shortDescription');
  const titleRaw = pickDefaultLocaleText(titleI18n);
  const slug = normalizeSlug(formData.get('slug')?.toString() ?? '', titleRaw);
  const publishedAtRaw = formData.get('publishedAt')?.toString() ?? '';
  const categoryIdRaw = formData.get('categoryId')?.toString().trim() ?? '';
  const blocks = parseBlogContentBlocks(formData.get('contentBlocks')?.toString() ?? '');
  const content = encodeDescriptionHtmlFromBlocks(blocks);

  const parsed = blogPostSchema.safeParse({
    title: titleRaw,
    slug,
    content,
    shortDescription: pickDefaultLocaleText(shortDescriptionI18n),
    image: formData.get('image')?.toString() ?? '',
    headerImage: formData.get('headerImage')?.toString() ?? '',
    backgroundImage: formData.get('backgroundImage')?.toString() ?? '',
    categoryId: categoryIdRaw,
    publishedAt: publishedAtRaw || new Date().toISOString().slice(0, 10),
    order: 0,
    isPublished: formData.get('isPublished') === 'on',
  });

  if (!parsed.success) {
    return { ok: false as const, errors: mapSchemaErrors(parsed.error.issues) };
  }

  const categoryId = parsed.data.categoryId?.trim() ? parsed.data.categoryId.trim() : null;
  if (categoryId) {
    const category = await prisma.blogCategory.findUnique({ where: { id: categoryId }, select: { id: true } });
    if (!category) {
      return { ok: false as const, errors: { categoryId: 'Choose a valid category.' } };
    }
  }

  const featured = parseFeaturedHomeFields(formData);
  return {
    ok: true as const,
    data: {
      title: encodeTranslatableText(titleI18n),
      slug: parsed.data.slug,
      content,
      shortDescription: encodeTranslatableText(shortDescriptionI18n),
      image: parsed.data.image?.trim() ? parsed.data.image : null,
      headerImage: parsed.data.headerImage?.trim() ? parsed.data.headerImage : null,
      backgroundImage: parsed.data.backgroundImage?.trim() ? parsed.data.backgroundImage : null,
      galleryContent: flattenGalleryFromBlocks(blocks) as unknown as Prisma.InputJsonValue,
      contentBlocks: serializeBlogContentBlocks(blocks) as unknown as Prisma.InputJsonValue,
      publishedAt: parsed.data.publishedAt,
      order: parsed.data.order,
      isPublished: parsed.data.isPublished,
      categoryId,
    },
    featured,
  };
}

function revalidate(slugs: string[] = []): void {
  revalidateBlogPostsCache(slugs);
}

export async function createBlogPostAction(_p: BlogFormState, formData: FormData): Promise<BlogFormState> {
  await requireAdmin();
  const parsed = await parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };

  const existing = await prisma.blogPost.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return {
      status: 'error',
      fieldErrors: { slug: 'A post with this slug already exists.' },
      message: 'Duplicate slug.',
    };
  }

  const created = await prisma.blogPost.create({ data: parsed.data });
  await persistBlogPostFeaturedHome(created.id, parsed.featured.featuredOnHome, parsed.featured.featuredOrder);
  revalidate([parsed.data.slug]);
  return { status: 'success', itemId: created.id };
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

  const parsed = await parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };

  if (parsed.data.slug !== current.slug) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: parsed.data.slug } });
    if (existing) {
      return {
        status: 'error',
        fieldErrors: { slug: 'A post with this slug already exists.' },
        message: 'Duplicate slug.',
      };
    }
  }

  await prisma.blogPost.update({ where: { id }, data: parsed.data });
  await persistBlogPostFeaturedHome(id, parsed.featured.featuredOnHome, parsed.featured.featuredOrder);
  revalidate([current.slug, parsed.data.slug]);
  return { status: 'success', itemId: id };
}

export async function deleteBlogPostAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    const row = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
    await prisma.blogPost.delete({ where: { id } });
    revalidate(row?.slug ? [row.slug] : []);
  });
}
