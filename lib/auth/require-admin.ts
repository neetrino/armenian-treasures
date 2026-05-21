import { auth } from './index';

export interface AdminContext {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR';
}

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export async function requireAdmin(): Promise<AdminContext> {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}

export async function getAdminOrNull(): Promise<AdminContext | null> {
  const session = await auth();
  if (!session?.user) return null;
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}
