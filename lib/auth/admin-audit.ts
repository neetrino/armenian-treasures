import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';

export type AdminAuditEvent =
  | 'login_success'
  | 'login_failed'
  | 'lockout'
  | 'logout'
  | 'password_changed';

export interface AdminAuditContext {
  adminUserId?: string | null;
  email?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Prisma.InputJsonValue | null;
}

export async function writeAdminAuditLog(
  event: AdminAuditEvent,
  context: AdminAuditContext = {},
): Promise<void> {
  await prisma.adminAuditLog.create({
    data: {
      event,
      adminUserId: context.adminUserId ?? null,
      email: context.email ?? null,
      ipAddress: context.ipAddress ?? null,
      userAgent: context.userAgent ?? null,
      metadata: context.metadata ?? undefined,
    },
  });
}
