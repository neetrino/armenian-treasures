import { prisma } from '@/lib/db';

export async function isAdminLoginEmail(email: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();
  const adminUser = await prisma.adminUser.findUnique({
    where: { email: normalizedEmail },
    select: { id: true },
  });
  return adminUser !== null;
}
