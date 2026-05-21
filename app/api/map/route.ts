import { NextResponse } from 'next/server';
import { getMapItems } from '@/lib/queries/culture-items';

export const revalidate = 60;

export async function GET(): Promise<Response> {
  const data = await getMapItems();
  return NextResponse.json({ ok: true, data });
}
