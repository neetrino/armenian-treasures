import { NextResponse } from 'next/server';
import { getActiveTeam } from '@/lib/queries/team';

export const revalidate = 60;

export async function GET(): Promise<Response> {
  const data = await getActiveTeam();
  return NextResponse.json({ ok: true, data });
}
