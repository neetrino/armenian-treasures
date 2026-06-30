import { prisma } from '@/lib/db';
import type { MemberDonationStatus } from '@prisma/client';

export interface MemberDonationRecord {
  id: string;
  amount: number;
  currency: string;
  label: string;
  status: MemberDonationStatus;
  createdAt: Date;
}

export async function getMemberDonations(memberId: string): Promise<MemberDonationRecord[]> {
  try {
    return await prisma.memberDonation.findMany({
      where: { memberId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        currency: true,
        label: true,
        status: true,
        createdAt: true,
      },
    });
  } catch {
    return [];
  }
}
