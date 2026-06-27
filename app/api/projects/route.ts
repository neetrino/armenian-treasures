import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getPublishedProjects } from '@/lib/queries/projects';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const data = await getPublishedProjects();
    return NextResponse.json({ ok: true, data });
  });
}
