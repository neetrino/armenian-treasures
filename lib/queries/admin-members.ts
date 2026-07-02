import { prisma } from '@/lib/db';
import { getMemberDonations, type MemberDonationRecord } from '@/lib/queries/member-donations';
import type { Prisma } from '@prisma/client';

export interface AdminMemberListRow {
  id: string;
  name: string;
  surname: string;
  email: string;
  country: string;
  phone: string;
  createdAt: Date;
  donationCount: number;
}

export interface AdminMemberDetail {
  id: string;
  name: string;
  surname: string;
  email: string;
  country: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  donations: MemberDonationRecord[];
}

async function getDonationCountsByMemberId(memberIds: string[]): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  if (memberIds.length === 0) return counts;

  try {
    const rows = await prisma.memberDonation.groupBy({
      by: ['memberId'],
      where: { memberId: { in: memberIds } },
      _count: { _all: true },
    });
    for (const row of rows) {
      counts.set(row.memberId, row._count._all);
    }
  } catch {
    // Stale Prisma client or missing table — list still works without counts.
  }

  return counts;
}

export async function listAdminMembers(
  where: Prisma.MemberWhereInput,
  skip: number,
  take: number,
  options?: { donationSort?: 'asc' | 'desc' },
): Promise<AdminMemberListRow[]> {
  const select = {
    id: true,
    name: true,
    surname: true,
    email: true,
    country: true,
    phone: true,
    createdAt: true,
  } as const;

  if (options?.donationSort) {
    const allMembers = await prisma.member.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select,
    });
    const donationCounts = await getDonationCountsByMemberId(allMembers.map((member) => member.id));
    const sorted = allMembers
      .map((member) => ({
        ...member,
        donationCount: donationCounts.get(member.id) ?? 0,
      }))
      .sort((a, b) => {
        const factor = options.donationSort === 'asc' ? 1 : -1;
        if (a.donationCount !== b.donationCount) {
          return (a.donationCount - b.donationCount) * factor;
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

    return sorted.slice(skip, skip + take);
  }

  const members = await prisma.member.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip,
    take,
    select,
  });
  const donationCounts = await getDonationCountsByMemberId(members.map((member) => member.id));

  return members.map((member) => ({
    ...member,
    donationCount: donationCounts.get(member.id) ?? 0,
  }));
}

export async function getAdminMemberDetail(id: string): Promise<AdminMemberDetail | null> {
  const member = await prisma.member.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      country: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!member) return null;

  const donations = await getMemberDonations(id);

  return { ...member, donations };
}
