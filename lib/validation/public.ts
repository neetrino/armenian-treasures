import { z } from 'zod';

export const honeypotSchema = z
  .string()
  .max(0, 'Bot detected')
  .optional()
  .or(z.literal(''));

export const subcategoryProposalSchema = z.object({
  proposedName: z.string().trim().min(2, 'Name is too short').max(80, 'Name is too long'),
  description: z
    .string()
    .trim()
    .min(10, 'Please describe your proposal')
    .max(2000, 'Description is too long'),
  submitterName: z.string().trim().min(2, 'Your name is required').max(80),
  submitterEmail: z.string().trim().email('A valid email is required'),
  submitterPhone: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  parentCategorySlug: z.string().trim().min(1),
  images: z.array(z.string()).max(5).optional().default([]),
  files: z.array(z.string()).max(3).optional().default([]),
  website: honeypotSchema,
});

export const projectSubmissionSchema = z.object({
  submitterName: z.string().trim().min(2).max(80),
  submitterEmail: z.string().trim().email(),
  submitterPhone: z.string().trim().max(40).optional().or(z.literal('')),
  projectTitle: z.string().trim().min(2).max(120),
  category: z.string().trim().min(1, 'Choose a category'),
  description: z.string().trim().min(20).max(4000),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  images: z.array(z.string()).max(8).optional().default([]),
  files: z.array(z.string()).max(5).optional().default([]),
  website: honeypotSchema,
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
  website: honeypotSchema,
});

export type SubcategoryProposalInput = z.infer<typeof subcategoryProposalSchema>;
export type ProjectSubmissionInput = z.infer<typeof projectSubmissionSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
