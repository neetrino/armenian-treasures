import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { PageContentForm } from '@/components/admin/page-content/PageContentForm';
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
  const initial = content as Record<string, unknown>;
  const formKey = row?.updatedAt.toISOString() ?? 'default';

  return (
    <AdminPageShell
      user={user}
      topbarTitle={PAGE_CONTENT_TITLES[params.slug]}
      title={PAGE_CONTENT_TITLES[params.slug]}
      description="Edit text, images, and sections visually. Changes appear on the public page after save."
      beforeHeader={<AdminBackLink href="/admin/page-content" label="All marketing pages" />}
    >
      <AdminPanelCard>
        <PageContentForm key={formKey} slug={params.slug} initial={initial} />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default AdminPageContentEditPage;
