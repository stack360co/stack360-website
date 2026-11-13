import { type NextRequest, NextResponse } from 'next/server';
import { location } from '@/helpers/lead-context';
import { getClientIp } from '@/lib/client-ip';

/**
 * The caller's own IP and approximate location, as the lead forms see them. Handy for checking
 * that the host still passes the location headers that fill the "Location" line in lead emails.
 */
export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  return NextResponse.json({ ip, location: location(req.headers) ?? null });
}
