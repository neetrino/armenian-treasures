import { NextResponse } from 'next/server';
import { verifyImageUploadPutToken } from '@/lib/admin/image-upload-put-token';
import { convertRasterToWebp, isConvertibleRasterMime } from '@/lib/images/convert-raster-to-webp';
import { uploadRasterImage } from '@/lib/storage/raster-r2';
import { isAdminManagedUploadKey } from '@/lib/storage/key-policies';

export const runtime = 'nodejs';

function sanitizeKey(key: string): string {
  return key.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.\./g, '');
}

export async function PUT(request: Request): Promise<Response> {
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

  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (contentType !== payload.mimeType) {
    return NextResponse.json({ ok: false, error: 'Content-Type does not match prepared upload.' }, { status: 400 });
  }

  const sourceBuffer = Buffer.from(await request.arrayBuffer());
  if (sourceBuffer.length <= 0 || sourceBuffer.length > payload.maxSize) {
    return NextResponse.json({ ok: false, error: 'File size is invalid or exceeds the allowed limit.' }, { status: 400 });
  }

  let buffer: Buffer = sourceBuffer;
  if (isConvertibleRasterMime(payload.mimeType)) {
    try {
      buffer = Buffer.from(await convertRasterToWebp(sourceBuffer));
    } catch (error) {
      console.error('[admin-upload] failed to convert image to WebP', error);
      return NextResponse.json({ ok: false, error: 'Failed to process uploaded image.' }, { status: 400 });
    }
  }

  const safeKey = sanitizeKey(payload.storageKey);

  try {
    await uploadRasterImage({
      key: safeKey,
      buffer,
      contentType: 'image/webp',
    });
  } catch (error) {
    console.error('[admin-upload] failed to store upload', safeKey, error);
    const message = error instanceof Error ? error.message : 'Failed to store uploaded image.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
