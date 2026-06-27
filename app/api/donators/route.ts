import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getPublicDonators } from '@/lib/queries/donators';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const data = await getPublicDonators();
    return NextResponse.json({ ok: true, data });
  });
}
