import { z } from 'zod';

export const honeypotSchema = z
  .string()
  .max(0, 'Bot detected')
  .optional()
  .or(z.literal(''));

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
  website: honeypotSchema,
});

export type ContactInput = z.infer<typeof contactSchema>;
