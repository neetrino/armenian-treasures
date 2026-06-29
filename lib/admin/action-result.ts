import { Prisma } from '@prisma/client';

export type AdminDeleteResult = { ok: true } | { ok: false; message: string };

export function friendlyDeleteError(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2003') {
      return 'This record is linked to other content and cannot be deleted. Remove linked items first.';
    }
    if (error.code === 'P2025') {
      return 'Record not found or already deleted.';
    }
  }
  return 'Could not complete the delete. Please try again.';
}

export async function runAdminDelete(task: () => Promise<void>): Promise<AdminDeleteResult> {
  try {
    await task();
    return { ok: true };
  } catch (error) {
    return { ok: false, message: friendlyDeleteError(error) };
  }
}
