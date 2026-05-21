import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/queries/settings';

export const revalidate = 60;

export async function GET(): Promise<Response> {
  const data = await getSiteSettings();
  return NextResponse.json({ ok: true, data });
}
