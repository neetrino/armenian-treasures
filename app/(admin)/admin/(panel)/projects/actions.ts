'use server';

import slugify from 'slugify';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateProjectsCache } from '@/lib/cache/revalidation';
import { projectSchema } from '@/lib/validation';
import {
  encodeTranslatableText,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';
import type { ProjectStatus } from '@prisma/client';

const STATUSES: ProjectStatus[] = ['UPCOMING', 'ACTIVE', 'FUNDED', 'COMPLETED', 'ARCHIVED'];

function asStatus(value: string): ProjectStatus {
  return STATUSES.includes(value as ProjectStatus) ? (value as ProjectStatus) : 'UPCOMING';
}

export interface ProjectFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const titleI18n = readLocalizedTextFromFormData(formData, 'title');
  const categoryI18n = readLocalizedTextFromFormData(formData, 'category');
  const regionI18n = readLocalizedTextFromFormData(formData, 'region');
  const descriptionI18n = readLocalizedTextFromFormData(formData, 'description');
  const titleRaw = pickDefaultLocaleText(titleI18n);
  const slugRaw = formData.get('slug')?.toString() ?? '';
  const slug = slugify(slugRaw.trim() || titleRaw, { lower: true, strict: true });
  const parsed = projectSchema.safeParse({
    title: titleRaw,
    slug,
    category: pickDefaultLocaleText(categoryI18n),
    region: pickDefaultLocaleText(regionI18n),
    description: pickDefaultLocaleText(descriptionI18n),
    image: formData.get('image')?.toString() ?? '',
    goalAmount: Number(formData.get('goalAmount') ?? 0),
    raisedAmount: Number(formData.get('raisedAmount') ?? 0),
    status: asStatus(formData.get('status')?.toString() ?? 'UPCOMING'),
    order: Number(formData.get('order') ?? 0),
    isPublished: formData.get('isPublished') === 'on',
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const basePath = issue.path.join('.') || 'form';
      const path =
        basePath === 'title' ||
        basePath === 'category' ||
        basePath === 'region' ||
        basePath === 'description'
          ? `${basePath}.EN`
          : basePath;
      if (!errors[path]) errors[path] = issue.message;
    }
    return { ok: false as const, errors };
  }
  return {
    ok: true as const,
    data: {
      title: encodeTranslatableText(titleI18n),
      slug: parsed.data.slug,
      category: encodeTranslatableText(categoryI18n),
      region: encodeTranslatableText(regionI18n) || null,
      description: encodeTranslatableText(descriptionI18n) || null,
      image: parsed.data.image?.trim() ? parsed.data.image : null,
      goalAmount: parsed.data.goalAmount,
      raisedAmount: parsed.data.raisedAmount,
      status: parsed.data.status,
      order: parsed.data.order,
      isPublished: parsed.data.isPublished,
    },
  };
}

function revalidate(): void {
  revalidateProjectsCache();
}

export async function createProjectAction(_p: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return { status: 'error', fieldErrors: { slug: 'Slug already exists' }, message: 'Duplicate slug.' };
  }
  await prisma.project.create({ data: parsed.data });
  revalidate();
  return { status: 'success' };
}

export async function updateProjectAction(
  id: string,
  _p: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) {
    return { status: 'error', fieldErrors: { slug: 'Slug already exists' }, message: 'Duplicate slug.' };
  }
  await prisma.project.update({ where: { id }, data: parsed.data });
  revalidate();
  return { status: 'success' };
}

export type UpdateProjectRaisedResult =
  | { ok: true; raisedAmount: number }
  | { ok: false; error: string };

export async function updateProjectRaisedAmountAction(
  id: string,
  raisedAmount: number,
): Promise<UpdateProjectRaisedResult> {
  await requireAdmin();
  if (!Number.isFinite(raisedAmount) || !Number.isInteger(raisedAmount) || raisedAmount < 0) {
    return { ok: false, error: 'Enter a valid whole dollar amount.' };
  }
  const updated = await prisma.project.update({
    where: { id },
    data: { raisedAmount },
    select: { raisedAmount: true },
  });
  revalidate();
  return { ok: true, raisedAmount: updated.raisedAmount };
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidate();
}

export async function toggleProjectPublishedAction(id: string, isPublished: boolean): Promise<void> {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: { isPublished } });
  revalidate();
}
