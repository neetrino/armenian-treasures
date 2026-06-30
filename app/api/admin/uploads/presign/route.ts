import { NextResponse } from 'next/server';
import { createAdminImagePresign } from '@/lib/admin/image-upload-presign';
import { handleRequireAdminApi } from '@/lib/auth/require-admin';
import {
  extractClientIp,
  getUploadRateLimiter,
  tooManyRequestsResponse,
} from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  return handleRequireAdminApi(async (admin) => {
    const ip = extractClientIp(request.headers);
    const limiter = getUploadRateLimiter();
    const check = await limiter.check(`upload:admin:${admin.id}:${ip}`);
    if (!check.allowed) {
      return tooManyRequestsResponse();
    }

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

    const result = await createAdminImagePresign(admin.id, {
      filename: input.filename ?? '',
      mimeType: input.mimeType ?? '',
      size: Number(input.size ?? 0),
      folder: input.folder ?? '',
      variant: input.variant,
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  });
}
