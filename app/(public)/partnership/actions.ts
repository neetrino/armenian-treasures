'use server';

import { headers } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { extractClientIp, getPublicRateLimiter } from '@/lib/rate-limit';
import { sanitizeUserText } from '@/lib/sanitize';

const partnershipInquirySchema = z.object({
  institution: z.string().trim().min(2, 'Institution name is required').max(200),
  sector: z.string().trim().min(1, 'Sector is required').max(120),
  representative: z.string().trim().min(2, 'Representative name is required').max(200),
  email: z.string().trim().email('A valid email is required'),
  objective: z.string().trim().min(20, 'Please describe your objective').max(5000),
  website: z.string().max(0).optional().or(z.literal('')),
});

export interface PartnershipInquiryActionState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitPartnershipInquiry(
  _prev: PartnershipInquiryActionState,
  formData: FormData,
): Promise<PartnershipInquiryActionState> {
  const ip = extractClientIp(await headers());
  const limit = await getPublicRateLimiter().check(`partnership:${ip}`);
  if (!limit.allowed) {
    return {
      status: 'error',
      message: 'Too many requests from your network. Please try again later.',
    };
  }

  const parsed = partnershipInquirySchema.safeParse({
    institution: formData.get('inst-name')?.toString() ?? '',
    sector: formData.get('sector')?.toString() ?? '',
    representative: formData.get('rep-name')?.toString() ?? '',
    email: formData.get('official-email')?.toString() ?? '',
    objective: formData.get('objective')?.toString() ?? '',
    website: formData.get('website')?.toString() ?? '',
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return {
      status: 'error',
      message: 'Please correct the highlighted fields.',
      fieldErrors,
    };
  }

  if (parsed.data.website) {
    return {
      status: 'success',
      message:
        'Your credentials have been received. Our Partnerships team will contact you within 5 business days.',
    };
  }

  const message = [
    'Partnership inquiry',
    `Institution: ${parsed.data.institution}`,
    `Sector: ${parsed.data.sector}`,
    `Representative: ${parsed.data.representative}`,
    '',
    parsed.data.objective,
  ].join('\n');

  await prisma.contactMessage.create({
    data: {
      name: sanitizeUserText(parsed.data.representative),
      email: parsed.data.email.toLowerCase(),
      message: sanitizeUserText(message),
      status: 'NEW',
    },
  });

  revalidateTag('admin-contact', 'max');

  return {
    status: 'success',
    message:
      'Your credentials have been received. Our Partnerships team will contact you within 5 business days.',
  };
}
