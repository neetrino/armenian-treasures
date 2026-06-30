import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { auth } from './index';

export interface MemberContext {
  id: string;
  name: string;
  surname: string;
  email: string;
  country: string;
  phone: string;
}

export interface HeaderMemberSummary {
  name: string;
  email: string;
}

export async function getHeaderMemberSummary(): Promise<HeaderMemberSummary | null> {
  const session = await auth();
  if (session?.user?.role !== 'MEMBER' || !session.user.id) return null;

  return {
    name: session.user.name,
    email: session.user.email,
  };
}

export async function getMemberOrNull(): Promise<MemberContext | null> {
  const session = await auth();
  if (session?.user?.role !== 'MEMBER' || !session.user.id) return null;

  const member = await prisma.member.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      country: true,
      phone: true,
    },
  });

  return member;
}

export async function requireMemberPage(): Promise<MemberContext> {
  const member = await getMemberOrNull();
  if (!member) redirect('/login');
  return member;
}
