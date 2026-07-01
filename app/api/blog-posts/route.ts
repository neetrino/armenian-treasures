import { NextResponse } from 'next/server';
import { withPublicApiRateLimit } from '@/lib/api/public-route';
import { getPublishedBlogPosts } from '@/lib/queries/blogs';

export const revalidate = 60;

export async function GET(request: Request): Promise<Response> {
  return withPublicApiRateLimit(request, async () => {
    const data = await getPublishedBlogPosts();
    return NextResponse.json({ ok: true, data });
  });
}
