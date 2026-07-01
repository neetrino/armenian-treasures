import { auth } from './index';

export type HeaderAccountSummary =
  | { kind: 'admin'; name: string; email: string }
  | { kind: 'member'; name: string; email: string };

export async function getHeaderAccountSummary(): Promise<HeaderAccountSummary | null> {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) return null;

  if (session.user.role === 'ADMIN') {
    return {
      kind: 'admin',
      name: session.user.name,
      email: session.user.email,
    };
  }

  if (session.user.role === 'MEMBER') {
    return {
      kind: 'member',
      name: session.user.name,
      email: session.user.email,
    };
  }

  return null;
}
