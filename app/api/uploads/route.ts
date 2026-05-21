import { NextResponse } from 'next/server';
import { extractClientIp, getPublicRateLimiter } from '@/lib/rate-limit';
import { generateKey, validateUpload, type UploadKind } from '@/lib/uploads';
import { getStorage } from '@/lib/storage';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  const limiter = getPublicRateLimiter();
  const ip = extractClientIp(request.headers);
  const check = await limiter.check(`upload:${ip}`);
  if (!check.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many uploads. Please try again later.' },
      { status: 429 },
    );
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ ok: false, error: 'Invalid form data' }, { status: 400 });
  }
  const file = formData.get('file');
  const kindRaw = formData.get('kind');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Missing file' }, { status: 400 });
  }
  const kind: UploadKind =
    kindRaw === 'public-file' ? 'public-file' : 'public-image';
  const validation = validateUpload(file, kind);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, error: validation.reason }, { status: 400 });
  }
  const key = generateKey('submissions/incoming', file.name);
  const body = Buffer.from(await file.arrayBuffer());
  const result = await getStorage().upload({
    key,
    body,
    contentType: file.type,
  });
  return NextResponse.json({ ok: true, key: result.key, url: result.url });
}
