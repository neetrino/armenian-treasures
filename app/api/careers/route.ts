import { NextResponse } from 'next/server';
import { getActiveCareers } from '@/lib/queries/careers';

export const revalidate = 60;

export async function GET(): Promise<Response> {
  const data = await getActiveCareers();
  return NextResponse.json({ ok: true, data });
}
