import { NextResponse } from 'next/server';
import { confirmAdminImageUpload } from '@/lib/admin/image-upload-confirm';
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
      confirmToken?: string;
      filename?: string;
      mimeType?: string;
      size?: number;
    };

    const result = await confirmAdminImageUpload(admin.id, {
      confirmToken: input.confirmToken ?? '',
      filename: input.filename ?? '',
      mimeType: input.mimeType ?? '',
      size: Number(input.size ?? 0),
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  });
}
