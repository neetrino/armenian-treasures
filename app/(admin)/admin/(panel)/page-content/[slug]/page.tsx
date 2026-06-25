import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { PageContentJsonForm } from '@/components/admin/PageContentJsonForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import {
  getDefaultPageContent,
  PAGE_CONTENT_SLUGS,
  PAGE_CONTENT_TITLES,
  type PageContentSlug,
} from '@/lib/types/page-content';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function isPageContentSlug(value: string): value is PageContentSlug {
  return (PAGE_CONTENT_SLUGS as readonly string[]).includes(value);
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  if (!isPageContentSlug(params.slug)) return { title: 'Page content' };
  return {
    title: PAGE_CONTENT_TITLES[params.slug],
    robots: { index: false, follow: false },
  };
}

async function AdminPageContentEditPage(props: PageProps) {
  const params = await props.params;
  if (!isPageContentSlug(params.slug)) notFound();

  const user = await requireAdmin();
  const row = await prisma.pageContent.findUnique({ where: { slug: params.slug } });
  const content = row?.content ?? getDefaultPageContent(params.slug);
  const initialJson = JSON.stringify(content, null, 2);

  return (
    <>
      <AdminTopbar title={PAGE_CONTENT_TITLES[params.slug]} user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title={PAGE_CONTENT_TITLES[params.slug]}
          description={`JSON content for ${params.slug}. Changes appear on the public page after save.`}
        />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <PageContentJsonForm slug={params.slug} initialJson={initialJson} />
        </div>
      </div>
    </>
  );
}

export default AdminPageContentEditPage;
