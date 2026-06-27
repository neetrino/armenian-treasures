'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import {
  NEWSLETTER_CONTACT_MESSAGE_PREFIX,
  NEWSLETTER_CONTACT_NAME,
} from '@/lib/inbox/contact-message-kind';
import { extractClientIp, getPublicRateLimiter } from '@/lib/rate-limit';
import { sanitizeUserText } from '@/lib/sanitize';

const newsletterSchema = z.object({
  email: z.string().trim().email('A valid email is required'),
  website: z.string().max(0).optional().or(z.literal('')),
});

export interface NewsletterActionState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function subscribeNewsletter(
  _prev: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const ip = extractClientIp(await headers());
  const limit = await getPublicRateLimiter().check(`newsletter:${ip}`);
  if (!limit.allowed) {
    return {
      status: 'error',
      message: 'Too many requests from your network. Please try again later.',
    };
  }

  const parsed = newsletterSchema.safeParse({
    email: formData.get('email')?.toString() ?? '',
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
      message: 'Please enter a valid email address.',
      fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { status: 'success', message: 'Thank you. You are subscribed.' };
  }

  await prisma.contactMessage.create({
    data: {
      name: NEWSLETTER_CONTACT_NAME,
      email: parsed.data.email.toLowerCase(),
      message: sanitizeUserText(`${NEWSLETTER_CONTACT_MESSAGE_PREFIX} from homepage.`),
      status: 'NEW',
    },
  });

  return { status: 'success', message: 'Thank you. You are subscribed.' };
}
