import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from './index';

export interface AdminContext {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN';
}

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

async function resolveActiveAdminFromSession(): Promise<AdminContext | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const adminUser = await prisma.adminUser.findFirst({
    where: { id: session.user.id, isActive: true },
    select: { id: true, email: true },
  });
  if (!adminUser) return null;

  return {
    id: adminUser.id,
    name: adminUser.email,
    email: adminUser.email,
    role: 'ADMIN',
  };
}

export async function requireAdmin(): Promise<AdminContext> {
  const admin = await resolveActiveAdminFromSession();
  if (!admin) throw new UnauthorizedError();
  return admin;
}

export async function getAdminOrNull(): Promise<AdminContext | null> {
  return resolveActiveAdminFromSession();
}

export function unauthorizedApiResponse(): NextResponse {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function requireAdminPage(): Promise<AdminContext> {
  const admin = await resolveActiveAdminFromSession();
  if (!admin) redirect('/admin/login');
  return admin;
}

export async function handleRequireAdminApi(
  handler: (admin: AdminContext) => Promise<Response>,
): Promise<Response> {
  try {
    const admin = await requireAdmin();
    return await handler(admin);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return unauthorizedApiResponse();
    }
    throw error;
  }
}
