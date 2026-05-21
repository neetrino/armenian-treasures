'use server';

import { headers } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';
import { subcategoryProposalSchema } from '@/lib/validation';
import { extractClientIp, getPublicRateLimiter } from '@/lib/rate-limit';
import { sanitizeUserText } from '@/lib/sanitize';

export interface SubmissionActionState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitSubcategoryProposal(
  _prev: SubmissionActionState,
  formData: FormData,
): Promise<SubmissionActionState> {
  const ip = extractClientIp(headers());
  const limit = await getPublicRateLimiter().check(`subcategory:${ip}`);
  if (!limit.allowed) {
    return { status: 'error', message: 'Too many submissions. Please try again later.' };
  }

  const renderedAt = Number(formData.get('renderedAt') ?? 0);
  if (renderedAt > 0 && Date.now() - renderedAt < 2000) {
    return { status: 'success', message: 'Thank you. Your proposal is queued for review.' };
  }

  const parsed = subcategoryProposalSchema.safeParse({
    proposedName: formData.get('proposedName')?.toString() ?? '',
    description: formData.get('description')?.toString() ?? '',
    submitterName: formData.get('submitterName')?.toString() ?? '',
    submitterEmail: formData.get('submitterEmail')?.toString() ?? '',
    submitterPhone: formData.get('submitterPhone')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
    parentCategorySlug: formData.get('parentCategorySlug')?.toString() ?? '',
    website: formData.get('website')?.toString() ?? '',
    images: [],
    files: [],
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
    return { status: 'success', message: 'Thank you. Your proposal is queued for review.' };
  }

  const parent = await prisma.cultureMenuItem.findFirst({
    where: { slug: parsed.data.parentCategorySlug, parentId: null, isActive: true },
  });
  if (!parent) {
    return { status: 'error', message: 'Parent category not found.' };
  }

  // TODO: wire Resend or SES here to notify curators of the new proposal.
  await prisma.submission.create({
    data: {
      type: 'SUBCATEGORY_REQUEST',
      status: 'PENDING',
      title: sanitizeUserText(parsed.data.proposedName),
      description: sanitizeUserText(parsed.data.description),
      message: sanitizeUserText(parsed.data.message ?? ''),
      parentCategorySlug: parent.slug,
      parentCategoryTitle: parent.title,
      submitterName: sanitizeUserText(parsed.data.submitterName),
      submitterEmail: parsed.data.submitterEmail.toLowerCase(),
      submitterPhone: sanitizeUserText(parsed.data.submitterPhone ?? ''),
    },
  });

  revalidateTag('admin-submissions');

  return {
    status: 'success',
    message: 'Thank you. Your proposal is queued for review.',
  };
}
