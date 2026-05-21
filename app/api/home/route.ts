import { NextResponse } from 'next/server';
import { getHomeContent } from '@/lib/queries/home';

export const revalidate = 60;

export async function GET(): Promise<Response> {
  const data = await getHomeContent();
  return NextResponse.json({ ok: true, data });
}
