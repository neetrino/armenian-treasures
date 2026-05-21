import { NextResponse } from 'next/server';
import { getPublicDonators } from '@/lib/queries/donators';

export const revalidate = 60;

export async function GET(): Promise<Response> {
  const data = await getPublicDonators();
  return NextResponse.json({ ok: true, data });
}
