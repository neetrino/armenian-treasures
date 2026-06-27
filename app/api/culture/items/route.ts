import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getItemsByMenuItem } from '@/lib/queries/culture-items';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const url = new URL(request.url);
    const menuItemId = url.searchParams.get('menuItemId');
    if (!menuItemId) {
      return NextResponse.json({ ok: false, error: 'menuItemId is required' }, { status: 400 });
    }
    const items = await getItemsByMenuItem(menuItemId);
    return NextResponse.json({ ok: true, data: items });
  });
}
