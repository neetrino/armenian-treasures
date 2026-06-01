'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { submissionUpdateSchema } from '@/lib/validation';
import type { SubmissionStatus } from '@prisma/client';

function revalidate(): void {
  revalidateTag('admin-submissions', 'max');
  revalidatePath('/admin/submissions');
}

export async function updateSubmissionStatusAction(id: string, status: SubmissionStatus): Promise<void> {
  await requireAdmin();
  const parsed = submissionUpdateSchema.safeParse({ status, adminNote: '' });
  if (!parsed.success) return;
  await prisma.submission.update({
    where: { id },
    data: { status: parsed.data.status },
  });
  revalidate();
}

export async function updateSubmissionNoteAction(id: string, adminNote: string): Promise<void> {
  await requireAdmin();
  const value = adminNote.slice(0, 4000);
  await prisma.submission.update({ where: { id }, data: { adminNote: value } });
  revalidate();
}

export async function deleteSubmissionAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.submission.delete({ where: { id } });
  revalidate();
}
