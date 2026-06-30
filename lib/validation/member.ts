import { z } from 'zod';
import { COUNTRY_CODES } from '@/lib/constants/countries';

const countrySchema = z
  .string()
  .trim()
  .min(2, 'Country is required')
  .refine((value) => COUNTRY_CODES.has(value), 'Select a valid country');

export const memberLoginSchema = z.object({
  email: z.string().trim().email('A valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const memberRegisterSchema = z.object({
  country: countrySchema,
  email: z.string().trim().email('A valid email is required'),
  name: z.string().trim().min(2, 'Name is too short').max(80, 'Name is too long'),
  surname: z.string().trim().min(2, 'Surname is too short').max(80, 'Surname is too long'),
  phone: z.string().trim().min(6, 'Phone number is too short').max(40, 'Phone number is too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type MemberLoginInput = z.infer<typeof memberLoginSchema>;
export type MemberRegisterInput = z.infer<typeof memberRegisterSchema>;

export const memberUpdateProfileSchema = z
  .object({
    country: countrySchema,
    email: z.string().trim().email('A valid email is required'),
    name: z.string().trim().min(2, 'Name is too short').max(80, 'Name is too long'),
    surname: z.string().trim().min(2, 'Surname is too short').max(80, 'Surname is too long'),
    phone: z.string().trim().min(6, 'Phone number is too short').max(40, 'Phone number is too long'),
    currentPassword: z.string().optional().or(z.literal('')),
    newPassword: z.string().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    const newPassword = data.newPassword?.trim() ?? '';
    const currentPassword = data.currentPassword?.trim() ?? '';

    if (!newPassword) return;

    if (!currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['currentPassword'],
        message: 'Enter your current password to set a new one',
      });
    }

    if (newPassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
        message: 'Password must be at least 8 characters',
      });
    }
  });

export type MemberUpdateProfileInput = z.infer<typeof memberUpdateProfileSchema>;
