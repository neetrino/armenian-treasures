import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { NextResponse } from 'next/server';
import { verifyImageUploadPutToken } from '@/lib/admin/image-upload-put-token';
import { uploadBufferToR2 } from '@/lib/storage/r2';
import { isAdminManagedUploadKey } from '@/lib/storage/key-policies';

export const runtime = 'nodejs';

function isR2Storage(): boolean {
  return (process.env.STORAGE_DRIVER ?? 'local') === 'r2';
}

function getUploadRoot(): string {
  return join(/*turbopackIgnore: true*/ process.cwd(), 'public', 'uploads');
}

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

  const buffer = Buffer.from(await request.arrayBuffer());
  if (buffer.length <= 0 || buffer.length > payload.maxSize) {
    return NextResponse.json({ ok: false, error: 'File size is invalid or exceeds the allowed limit.' }, { status: 400 });
  }

  const safeKey = sanitizeKey(payload.storageKey);

  try {
    if (isR2Storage()) {
      await uploadBufferToR2({
        key: safeKey,
        buffer,
        contentType: payload.mimeType,
      });
    } else {
      const absolute = join(getUploadRoot(), safeKey);
      await mkdir(dirname(absolute), { recursive: true });
      await writeFile(absolute, buffer);
    }
  } catch (error) {
    console.error('[admin-upload] failed to store upload', safeKey, error);
    return NextResponse.json({ ok: false, error: 'Failed to store uploaded image.' }, { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
