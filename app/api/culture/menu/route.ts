import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getMenuTree } from '@/lib/queries/menu';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const tree = await getMenuTree();
    return NextResponse.json({ ok: true, data: tree });
  });
}
