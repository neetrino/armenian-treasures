'use server';

import { headers } from 'next/headers';
import { prisma } from '@/lib/db';
import {
  FAST_SUBMIT_ERROR_MESSAGE,
  getFormRenderedAt,
  isFormSubmittedTooFast,
} from '@/lib/forms/bot-guard';
import { projectSubmissionSchema } from '@/lib/validation';
import { extractClientIp, getPublicRateLimiter } from '@/lib/rate-limit';
import { sanitizeUserText } from '@/lib/sanitize';
import type { SubmissionType } from '@prisma/client';
import { GENERAL_CATEGORY_VALUE } from '@/app/(public)/culture/submit/project-submission-shared';
import type { ProjectSubmissionState } from '@/app/(public)/culture/submit/project-submission-shared';
import { resolveSubmitCategoryFromMenuItem } from '@/lib/submit-category';

export async function submitProjectMaterial(
  _prev: ProjectSubmissionState,
  formData: FormData,
): Promise<ProjectSubmissionState> {
  try {
    const ip = extractClientIp(await headers());
    const limit = await getPublicRateLimiter().check(`submit:${ip}`);
    if (!limit.allowed) {
      return {
        status: 'error',
        message: 'Too many submissions. Please try again later.',
      };
    }

    if (isFormSubmittedTooFast(getFormRenderedAt(formData))) {
      return { status: 'error', message: FAST_SUBMIT_ERROR_MESSAGE };
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
    let resolvedParentCategoryTitle: string | null = null;

    if (parsed.data.category && parsed.data.category !== GENERAL_CATEGORY_VALUE) {
      const menuItem = await prisma.cultureMenuItem.findFirst({
        where: { id: parsed.data.category, isActive: true },
        include: { parent: true },
      });
      if (!menuItem) {
        return {
          status: 'error',
          message: 'Please correct the highlighted fields.',
          fieldErrors: { category: 'Choose a valid category.' },
        };
      }
      const resolved = resolveSubmitCategoryFromMenuItem(menuItem);
      type = 'CULTURE_ITEM_REQUEST';
      resolvedCategoryTitle = resolved.categoryLabel;
      resolvedCategorySlug = menuItem.slug;
      resolvedParentCategoryTitle = resolved.parentCategoryTitle;
    } else if (parsed.data.category === GENERAL_CATEGORY_VALUE) {
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
        parentCategoryTitle: resolvedParentCategoryTitle,
        submitterName: sanitizeUserText(parsed.data.submitterName),
        submitterEmail: parsed.data.submitterEmail.toLowerCase(),
        submitterPhone: sanitizeUserText(parsed.data.submitterPhone ?? ''),
      },
    });

    return {
      status: 'success',
      message: 'Thank you. Your submission is queued for review.',
    };
  } catch {
    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    };
  }
}
