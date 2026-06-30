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
): Promise<AdminMemberListRow[]> {
  const members = await prisma.member.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip,
    take,
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      country: true,
      phone: true,
      createdAt: true,
    },
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
