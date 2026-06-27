'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { revalidateDonatorsCache } from '@/lib/cache/revalidation';
import { donatorSchema } from '@/lib/validation';

export interface DonatorFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const yearRaw = formData.get('year')?.toString() ?? '';
  const parsed = donatorSchema.safeParse({
    name: formData.get('name')?.toString() ?? '',
    type: formData.get('type')?.toString() ?? '',
    year: yearRaw.trim() === '' ? null : Number(yearRaw),
    description: formData.get('description')?.toString() ?? '',
    order: Number(formData.get('order') ?? 0),
    isPublic: formData.get('isPublic') === 'on',
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
      year: parsed.data.year ?? null,
      description: parsed.data.description?.trim() ? parsed.data.description : null,
    },
  };
}

function revalidate(): void {
  revalidateDonatorsCache();
}

export async function createDonatorAction(_p: DonatorFormState, formData: FormData): Promise<DonatorFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.donator.create({ data: parsed.data });
  revalidate();
  return { status: 'success' };
}

export async function updateDonatorAction(
  id: string,
  _p: DonatorFormState,
  formData: FormData,
): Promise<DonatorFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.donator.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect('/admin/donators');
}

export async function deleteDonatorAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    await prisma.donator.delete({ where: { id } });
    revalidate();
  });
}
