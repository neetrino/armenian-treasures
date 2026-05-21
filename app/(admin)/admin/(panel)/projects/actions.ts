'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import slugify from 'slugify';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { projectSchema } from '@/lib/validation';
import type { ProjectStatus } from '@prisma/client';

const STATUSES: ProjectStatus[] = ['UPCOMING', 'ACTIVE', 'FUNDED', 'COMPLETED', 'ARCHIVED'];

function asStatus(value: string): ProjectStatus {
  return STATUSES.includes(value as ProjectStatus) ? (value as ProjectStatus) : 'UPCOMING';
}

export interface ProjectFormState {
  status: 'idle' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const titleRaw = formData.get('title')?.toString() ?? '';
  const slugRaw = formData.get('slug')?.toString() ?? '';
  const slug = slugify(slugRaw.trim() || titleRaw, { lower: true, strict: true });
  const parsed = projectSchema.safeParse({
    title: titleRaw,
    slug,
    category: formData.get('category')?.toString() ?? '',
    region: formData.get('region')?.toString() ?? '',
    description: formData.get('description')?.toString() ?? '',
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
      category: parsed.data.category,
      region: parsed.data.region?.trim() ? parsed.data.region : null,
      description: parsed.data.description?.trim() ? parsed.data.description : null,
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
  revalidateTag('projects');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
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
  redirect('/admin/projects');
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
  redirect('/admin/projects');
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
