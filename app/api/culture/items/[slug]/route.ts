import { NextResponse } from 'next/server';
import { getCultureItemBySlug } from '@/lib/queries/culture-items';

export const revalidate = 60;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, props: Params): Promise<Response> {
  const params = await props.params;
  const item = await getCultureItemBySlug(params.slug);
  if (!item) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, data: item });
}
