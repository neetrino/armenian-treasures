import { NextResponse } from 'next/server';
import { isSketchfabShortUrl, resolveTourEmbedSrc, toTourEmbedSrc } from '@/lib/embed-urls';

export const runtime = 'nodejs';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get('url')?.trim() ?? '';
  if (!raw) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  const host = parsed.hostname.replace(/^www\./, '');
  const allowed =
    host === 'skfb.ly' ||
    host === 'sketchfab.com' ||
    host.endsWith('.matterport.com') ||
    host === 'my.matterport.com';
  if (!allowed) {
    return NextResponse.json({ error: 'Unsupported host' }, { status: 400 });
  }

  const embedSrc = isSketchfabShortUrl(raw)
    ? await resolveTourEmbedSrc(raw)
    : toTourEmbedSrc(raw);

  if (!embedSrc) {
    return NextResponse.json({ error: 'Could not resolve embed' }, { status: 404 });
  }

  return NextResponse.json(
    { embedSrc },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    },
  );
}
