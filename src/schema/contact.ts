import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(80, 'Your name is a little too long.')
    // Any script's letters plus marks, spaces, apostrophes, hyphens and full stops,
    // so names like "Dvořák", "Robert Downey Jr." or Urdu and Arabic names pass.
    .regex(/^[\p{L}\p{M}' .-]+$/u, 'Please use only letters in your name.'),

  email: z
    .email('Please enter a valid email address.')
    .min(1, 'Please enter your email address.')
    .max(254, 'Your email address is too long.'),

  company: z.string().trim().max(60, 'Company name is too long.').optional(),

  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more about your project.')
    .max(2000, 'Please keep your message under 2,000 characters.')
    .refine((value) => value.split(/\s+/).length >= 3, {
      message: 'Please add a few more details to your message.',
    }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
