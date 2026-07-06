import { NextResponse } from 'next/server';
import { createAdminImagePresign, validateAdminImagePresignRequest } from '@/lib/admin/image-upload-presign';
import { handleRequireAdminApi } from '@/lib/auth/require-admin';
import {
  extractClientIp,
  getAdminUploadRateLimiter,
  tooManyRequestsResponse,
} from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  return handleRequireAdminApi(async (admin) => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
    }

    const input = body as {
      filename?: string;
      mimeType?: string;
      size?: number;
      folder?: string;
      variant?: string;
    };

    const presignInput = {
      filename: input.filename ?? '',
      mimeType: input.mimeType ?? '',
      size: Number(input.size ?? 0),
      folder: input.folder ?? '',
      variant: input.variant,
    };

    const validated = validateAdminImagePresignRequest(presignInput);
    if (!validated.ok) {
      return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
    }

    const ip = extractClientIp(request.headers);
    const limiter = getAdminUploadRateLimiter();
    const check = await limiter.check(`admin-upload:${admin.id}:${ip}`);
    if (!check.allowed) {
      return tooManyRequestsResponse();
    }

    const result = await createAdminImagePresign(admin.id, presignInput);

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  });
}
