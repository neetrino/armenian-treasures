import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getActiveCareers } from '@/lib/queries/careers';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const data = await getActiveCareers();
    return NextResponse.json({ ok: true, data });
  });
}
