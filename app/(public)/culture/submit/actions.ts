'use server';

import { headers } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';
import { projectSubmissionSchema } from '@/lib/validation';
import { extractClientIp, getPublicRateLimiter } from '@/lib/rate-limit';
import { sanitizeUserText } from '@/lib/sanitize';
import type { SubmissionType } from '@prisma/client';

export interface ProjectSubmissionState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

const GENERAL_VALUE = '__general__';

export async function submitProjectMaterial(
  _prev: ProjectSubmissionState,
  formData: FormData,
): Promise<ProjectSubmissionState> {
  const ip = extractClientIp(headers());
  const limit = await getPublicRateLimiter().check(`submit:${ip}`);
  if (!limit.allowed) {
    return {
      status: 'error',
      message: 'Too many submissions. Please try again later.',
    };
  }

  const renderedAt = Number(formData.get('renderedAt') ?? 0);
  if (renderedAt > 0 && Date.now() - renderedAt < 2000) {
    return { status: 'success', message: 'Thank you. Your submission is queued for review.' };
  }

  const parsed = projectSubmissionSchema.safeParse({
    submitterName: formData.get('submitterName')?.toString() ?? '',
    submitterEmail: formData.get('submitterEmail')?.toString() ?? '',
    submitterPhone: formData.get('submitterPhone')?.toString() ?? '',
    projectTitle: formData.get('projectTitle')?.toString() ?? '',
    category: formData.get('category')?.toString() ?? '',
    description: formData.get('description')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
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
    return { status: 'success', message: 'Thank you. Your submission is queued for review.' };
  }

  let type: SubmissionType = 'PROJECT_REQUEST';
  let resolvedCategoryTitle: string | null = null;
  let resolvedCategorySlug: string | null = null;
  if (parsed.data.category && parsed.data.category !== GENERAL_VALUE) {
    const menuItem = await prisma.cultureMenuItem.findFirst({
      where: { slug: parsed.data.category, isActive: true },
    });
    if (menuItem) {
      type = 'CULTURE_ITEM_REQUEST';
      resolvedCategoryTitle = menuItem.title;
      resolvedCategorySlug = menuItem.slug;
    } else {
      type = 'GENERAL_REQUEST';
    }
  } else if (parsed.data.category === GENERAL_VALUE) {
    type = 'GENERAL_REQUEST';
  }

  // TODO: wire Resend or SES here to notify curators of the new submission.
  await prisma.submission.create({
    data: {
      type,
      status: 'PENDING',
      title: sanitizeUserText(parsed.data.projectTitle),
      description: sanitizeUserText(parsed.data.description),
      message: sanitizeUserText(parsed.data.message ?? ''),
      category: resolvedCategoryTitle ?? parsed.data.category,
      parentCategorySlug: resolvedCategorySlug,
      parentCategoryTitle: resolvedCategoryTitle,
      submitterName: sanitizeUserText(parsed.data.submitterName),
      submitterEmail: parsed.data.submitterEmail.toLowerCase(),
      submitterPhone: sanitizeUserText(parsed.data.submitterPhone ?? ''),
    },
  });

  revalidateTag('admin-submissions');

  return {
    status: 'success',
    message: 'Thank you. Your submission is queued for review.',
  };
}

export const GENERAL_CATEGORY_VALUE = GENERAL_VALUE;
