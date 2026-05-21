import { NextResponse } from 'next/server';
import { requireAdmin, UnauthorizedError } from '@/lib/auth/require-admin';
import { getAdminStats } from '@/lib/queries/admin-stats';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  try {
    await requireAdmin();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
    throw error;
  }
  const stats = await getAdminStats();
  return NextResponse.json({ ok: true, data: stats });
}
