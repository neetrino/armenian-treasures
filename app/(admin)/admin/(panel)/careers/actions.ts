'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { careerSchema } from '@/lib/validation';

export interface CareerFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const parsed = careerSchema.safeParse({
    title: formData.get('title')?.toString() ?? '',
    location: formData.get('location')?.toString() ?? '',
    employmentType: formData.get('employmentType')?.toString() ?? '',
    description: formData.get('description')?.toString() ?? '',
    applyUrl: formData.get('applyUrl')?.toString() ?? '',
    applyEmail: formData.get('applyEmail')?.toString() ?? '',
    order: Number(formData.get('order') ?? 0),
    isActive: formData.get('isActive') === 'on',
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
      ...parsed.data,
      description: parsed.data.description?.trim() ? parsed.data.description : null,
      applyUrl: parsed.data.applyUrl?.trim() ? parsed.data.applyUrl : null,
      applyEmail: parsed.data.applyEmail?.trim() ? parsed.data.applyEmail : null,
    },
  };
}

function revalidate(): void {
  revalidateTag('careers', 'max');
  revalidatePath('/about/career');
  revalidatePath('/admin/careers');
}

export async function createCareerAction(_p: CareerFormState, formData: FormData): Promise<CareerFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.career.create({ data: parsed.data });
  revalidate();
  return { status: 'success' };
}

export async function updateCareerAction(
  id: string,
  _p: CareerFormState,
  formData: FormData,
): Promise<CareerFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.career.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect('/admin/careers');
}

export async function deleteCareerAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.career.delete({ where: { id } });
  revalidate();
}
