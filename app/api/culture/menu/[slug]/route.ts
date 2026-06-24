import { NextResponse } from 'next/server';
import { getMenuTree } from '@/lib/queries/menu';

export const revalidate = 60;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, props: Params): Promise<Response> {
  const params = await props.params;
  const tree = await getMenuTree();
  const node = tree.find((n) => n.slug === params.slug);
  if (!node) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, data: node });
}
