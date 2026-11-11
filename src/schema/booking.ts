import { z } from 'zod';

/**
 * What the site posts after a Calendly booking made from its "Book a call" button. Calendly's
 * embed sends only the booking's links (no name or email), so these carry how the visitor found
 * us, and Claude matches them to the booking in Calendly.
 */
const calendlyLink = (path: string) =>
  new RegExp(`^https://api\\.calendly\\.com/(api/v2/)?scheduled_events/[A-Za-z0-9-]+${path}$`);

export const bookingPayloadSchema = z.object({
  inviteeUri: z
    .string()
    .trim()
    .max(300)
    .regex(calendlyLink('/invitees/[A-Za-z0-9-]+'), 'Invalid booking.'),
  eventUri: z.string().trim().max(300).regex(calendlyLink(''), 'Invalid booking.').optional(),
});
