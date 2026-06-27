import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getSiteSettings } from '@/lib/queries/settings';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const data = await getSiteSettings();
    return NextResponse.json({ ok: true, data });
  });
}
