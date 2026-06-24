import { NextResponse } from 'next/server';
import { getAdminOrNull } from '@/lib/auth/require-admin';
import {
  createUploadSessionId,
  createUploadToken,
  validateFileBuffer,
  verifyUploadToken,
} from '@/lib/uploads';
import { storeValidatedUpload } from '@/lib/uploads/store-upload';
import {
  extractClientIp,
  getUploadRateLimiter,
  tooManyRequestsResponse,
} from '@/lib/rate-limit';

export const runtime = 'nodejs';

interface UploadAuthContext {
  ownerType: string;
  ownerId: string;
  rateKey: string;
}

async function resolveUploadAuth(request: Request): Promise<UploadAuthContext | null> {
  const admin = await getAdminOrNull();
  if (admin) {
    const ip = extractClientIp(request.headers);
    return {
      ownerType: 'admin',
      ownerId: admin.id,
      rateKey: `upload:admin:${admin.id}:${ip}`,
    };
  }

  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null;

  const formData = await request.clone().formData().catch(() => null);
  const formToken = formData?.get('uploadToken')?.toString() ?? null;
  const token = bearerToken ?? formToken;
  if (!token) return null;

  const payload = verifyUploadToken(token);
  if (!payload) return null;

  const ip = extractClientIp(request.headers);
  return {
    ownerType: 'session',
    ownerId: payload.sessionId,
    rateKey: `upload:session:${payload.sessionId}:${ip}`,
  };
}

export async function POST(request: Request): Promise<Response> {
  const authContext = await resolveUploadAuth(request);
  if (!authContext) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const limiter = getUploadRateLimiter();
  const check = await limiter.check(authContext.rateKey);
  if (!check.allowed) {
    return tooManyRequestsResponse();
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ ok: false, error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Missing file' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const validation = validateFileBuffer(buffer, file.name, file.type);
  if (!validation.ok || !validation.detectedMime) {
    return NextResponse.json(
      { ok: false, error: validation.reason ?? 'Invalid file' },
      { status: 400 },
    );
  }

  const stored = await storeValidatedUpload({
    ownerType: authContext.ownerType,
    ownerId: authContext.ownerId,
    originalFilename: file.name,
    detectedMime: validation.detectedMime,
    buffer,
    isImage: Boolean(validation.isImage),
  });

  return NextResponse.json({
    ok: true,
    id: stored.id,
    key: stored.storageKey,
    status: stored.status,
    ...(stored.publicUrl ? { url: stored.publicUrl } : {}),
  });
}

export async function GET(request: Request): Promise<Response> {
  const ip = extractClientIp(request.headers);
  const limiter = getUploadRateLimiter();
  const check = await limiter.check(`upload-token:${ip}`);
  if (!check.allowed) {
    return tooManyRequestsResponse();
  }

  const sessionId = createUploadSessionId();
  const token = createUploadToken(sessionId);
  return NextResponse.json({
    ok: true,
    uploadToken: token,
    expiresInSeconds: 15 * 60,
  });
}
