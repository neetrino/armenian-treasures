import { NextResponse } from 'next/server';
import { getMenuTree } from '@/lib/queries/menu';

export const revalidate = 60;

export async function GET(): Promise<Response> {
  const tree = await getMenuTree();
  return NextResponse.json({ ok: true, data: tree });
}
