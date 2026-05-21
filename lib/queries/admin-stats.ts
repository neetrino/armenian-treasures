import { prisma } from '@/lib/db';

export interface AdminStats {
  totalCultureItems: number;
  pendingSubmissions: number;
  pendingByType: Record<string, number>;
  activeProjects: number;
  newContactMessages: number;
  totalTeam: number;
  totalDonators: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const [
      totalCultureItems,
      pendingSubmissions,
      submissionsByType,
      activeProjects,
      newContactMessages,
      totalTeam,
      totalDonators,
    ] = await Promise.all([
      prisma.cultureItem.count({ where: { status: 'PUBLISHED' } }),
      prisma.submission.count({ where: { status: 'PENDING' } }),
      prisma.submission.groupBy({
        by: ['type'],
        where: { status: 'PENDING' },
        _count: { _all: true },
      }),
      prisma.project.count({ where: { status: 'ACTIVE' } }),
      prisma.contactMessage.count({ where: { status: 'NEW' } }),
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.donator.count({ where: { isPublic: true } }),
    ]);
    const pendingByType: Record<string, number> = {};
    for (const row of submissionsByType) pendingByType[row.type] = row._count._all;
    return {
      totalCultureItems,
      pendingSubmissions,
      pendingByType,
      activeProjects,
      newContactMessages,
      totalTeam,
      totalDonators,
    };
  } catch {
    return {
      totalCultureItems: 0,
      pendingSubmissions: 0,
      pendingByType: {},
      activeProjects: 0,
      newContactMessages: 0,
      totalTeam: 0,
      totalDonators: 0,
    };
  }
}
