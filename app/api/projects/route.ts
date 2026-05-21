import { NextResponse } from 'next/server';
import { getPublishedProjects } from '@/lib/queries/projects';

export const revalidate = 60;

export async function GET(): Promise<Response> {
  const data = await getPublishedProjects();
  return NextResponse.json({ ok: true, data });
}
