'use server';

import { headers } from 'next/headers';
import { prisma } from '@/lib/db';
import {
  FAST_SUBMIT_ERROR_MESSAGE,
  getFormRenderedAt,
  isFormSubmittedTooFast,
} from '@/lib/forms/bot-guard';
import { contactSchema } from '@/lib/validation';
import { extractClientIp, getPublicRateLimiter } from '@/lib/rate-limit';
import { sanitizeUserText } from '@/lib/sanitize';

export interface ContactActionState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitContactMessage(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const ip = extractClientIp(await headers());
  const limit = await getPublicRateLimiter().check(`contact:${ip}`);
  if (!limit.allowed) {
    return {
      status: 'error',
      message: 'Too many messages from your network. Please try again later.',
    };
  }

  if (isFormSubmittedTooFast(getFormRenderedAt(formData))) {
    return { status: 'error', message: FAST_SUBMIT_ERROR_MESSAGE };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
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
    return { status: 'success', message: 'Thank you. We have received your message.' };
  }

  // TODO: wire Resend or SES here to email the foundation inbox.
  await prisma.contactMessage.create({
    data: {
      name: sanitizeUserText(parsed.data.name),
      email: parsed.data.email.toLowerCase(),
      message: sanitizeUserText(parsed.data.message),
      status: 'NEW',
    },
  });

  return { status: 'success', message: 'Thank you. We have received your message.' };
}
