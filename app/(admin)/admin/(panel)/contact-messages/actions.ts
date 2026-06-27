'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { contactMessageUpdateSchema } from '@/lib/validation';
import type { ContactStatus } from '@prisma/client';

function revalidate(): void {
  revalidatePath('/admin/contact-messages');
}

export async function updateContactStatusAction(id: string, status: ContactStatus): Promise<void> {
  await requireAdmin();
  const parsed = contactMessageUpdateSchema.safeParse({ status, adminNote: '' });
  if (!parsed.success) return;
  await prisma.contactMessage.update({ where: { id }, data: { status: parsed.data.status } });
  revalidate();
}

export async function updateContactNoteAction(id: string, adminNote: string): Promise<void> {
  await requireAdmin();
  await prisma.contactMessage.update({
    where: { id },
    data: { adminNote: adminNote.slice(0, 4000) },
  });
  revalidate();
}

export async function deleteContactMessageAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    await prisma.contactMessage.delete({ where: { id } });
    revalidate();
  });
}
