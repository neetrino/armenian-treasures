'use server';

import { headers } from 'next/headers';
import { signOut, auth } from '@/lib/auth';
import { writeAdminAuditLog } from '@/lib/auth/admin-audit';
import { extractClientIp } from '@/lib/rate-limit';

export async function logoutAction(): Promise<void> {
  const session = await auth();
  const headerStore = headers();

  if (session?.user?.id || session?.user?.email) {
    await writeAdminAuditLog('logout', {
      adminUserId: session.user.id ?? null,
      email: session.user.email ?? null,
      ipAddress: extractClientIp(headerStore),
      userAgent: headerStore.get('user-agent'),
    });
  }

  await signOut({ redirectTo: '/admin/login' });
}
