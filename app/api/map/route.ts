import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getMapItems } from '@/lib/queries/culture-items';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const data = await getMapItems();
    return NextResponse.json({ ok: true, data });
  });
}
