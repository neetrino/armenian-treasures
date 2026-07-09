import { NextResponse } from 'next/server';
import { verifyImageUploadPutToken } from '@/lib/admin/image-upload-put-token';
import { isAdminManagedUploadKey } from '@/lib/storage/key-policies';
import { isR2Configured } from '@/lib/storage/raster-public-url';
import { uploadBufferToR2 } from '@/lib/storage/r2';

export const runtime = 'nodejs';
export const maxDuration = 60;

const WEBP_MIME = 'image/webp';

function sanitizeKey(key: string): string {
  return key.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.\./g, '');
}

export async function PUT(request: Request): Promise<Response> {
  try {
    return await handleAdminUploadPut(request);
  } catch (error) {
    console.error('[admin-upload] PUT failed unexpectedly', error);
    const message = error instanceof Error ? error.message : 'Unexpected upload failure.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

async function handleAdminUploadPut(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get('token')?.trim();
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing upload token.' }, { status: 400 });
  }

  const payload = verifyImageUploadPutToken(token);
  if (!payload) {
    return NextResponse.json({ ok: false, error: 'Upload token expired or invalid.' }, { status: 401 });
  }

  if (!isAdminManagedUploadKey(payload.storageKey)) {
    console.error('[admin-upload] PUT rejected unmanaged key', payload.storageKey);
    return NextResponse.json({ ok: false, error: 'Invalid storage key.' }, { status: 400 });
  }

  if (payload.mimeType !== WEBP_MIME) {
    return NextResponse.json({ ok: false, error: 'Upload must be prepared as WebP.' }, { status: 400 });
  }

  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (contentType !== WEBP_MIME) {
    return NextResponse.json({ ok: false, error: 'Content-Type must be image/webp.' }, { status: 400 });
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Image storage is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, and R2_PUBLIC_URL.',
      },
      { status: 503 },
    );
  }

  const buffer = Buffer.from(await request.arrayBuffer());
  if (buffer.length <= 0 || buffer.length > payload.maxSize) {
    return NextResponse.json({ ok: false, error: 'File size is invalid or exceeds the allowed limit.' }, { status: 400 });
  }

  const safeKey = sanitizeKey(payload.storageKey);

  try {
    await uploadBufferToR2({
      key: safeKey,
      buffer,
      contentType: WEBP_MIME,
    });
  } catch (error) {
    console.error('[admin-upload] failed to store upload', safeKey, error);
    const message = error instanceof Error ? error.message : 'Failed to store uploaded image.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
