import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getHomeContent } from '@/lib/queries/home';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const data = await getHomeContent();
    return NextResponse.json({ ok: true, data });
  });
}
