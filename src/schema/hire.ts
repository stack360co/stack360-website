import { z } from 'zod';

export const hireSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  company: z.string().trim().optional(),
  skills: z.array(z.string()).min(1, 'Please select at least one skill.'),
  need: z.string().min(1, 'Please select what best describes your need.'),
  notes: z.string().trim().optional(),
});

export type HireFormData = z.infer<typeof hireSchema>;

/** What the hire form posts to the webhook route: skills and need arrive as display labels. */
export const hirePayloadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120, 'Your name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  company: z.string().trim().max(200).optional(),
  skillLabels: z.string().trim().min(1, 'Please select at least one skill.').max(1000),
  needLabel: z.string().trim().min(1, 'Please select what best describes your need.').max(200),
  notes: z.string().trim().max(5000, 'Please keep your notes under 5,000 characters.').optional(),
});
