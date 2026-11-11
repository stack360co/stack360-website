import z from 'zod';

export const serverSchema = z.object({
  // =========================
  // Server Variables (Only available on Node.js server)
  // =========================
  // NEXTAUTH_SECRET: z.string().min(1),
  // NEXTAUTH_URL: z.url(),
  // NEXT_URL: z.url(),
  // NEXT_BE_API_URL: z.url(),
  // NEXT_BE_API_HOST_NAME: z.string().min(1),
  // NEXT_BE_API_PORT: z.coerce.number(),
  MATTERMOST_WEBHOOK_ID: z.string().min(1),
  // Optional: also email each website lead to sales@ through Resend. Leave either one unset and
  // leads go to Mattermost only. No min(1): an empty value must not fail the whole server.
  RESEND_API_KEY: z.string().optional(),
  LEAD_EMAIL_FROM: z.string().optional(),
});

export const clientSchema = z.object({
  // =========================
  // Client Variables (Available on browser & server)
  // =========================
  // NEXT_PUBLIC_MAIN_DOMAIN: z.string().min(1),
  // NEXT_PUBLIC_PORT: z.coerce.number(),
  NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production', 'test']),
});

export const envSchema = serverSchema.extend(clientSchema.shape);
export type Env = z.infer<typeof envSchema>;
