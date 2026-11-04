import { z } from 'zod';

export const hireSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  company: z.string().trim().optional(),
  // Only name and email are required, so asking for profiles takes seconds; skills and need
  // help us shortlist when they're given.
  skills: z.array(z.string()),
  need: z.string(),
  notes: z.string().trim().optional(),
});

export type HireFormData = z.infer<typeof hireSchema>;

/** What the hire form posts to the webhook route: skills and need arrive as display labels. */
export const hirePayloadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120, 'Your name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  company: z.string().trim().max(200).optional(),
  skillLabels: z.string().trim().max(1000).optional(),
  needLabel: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(5000, 'Please keep your notes under 5,000 characters.').optional(),
});
