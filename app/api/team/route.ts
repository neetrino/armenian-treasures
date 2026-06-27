import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getActiveTeam } from '@/lib/queries/team';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const data = await getActiveTeam();
    return NextResponse.json({ ok: true, data });
  });
}
