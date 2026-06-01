import type { Metadata } from 'next';
import { CultureMenuCreateModal } from '@/components/admin/CultureMenuCreateModal';
import { CultureMenuPageContent } from '@/components/admin/CultureMenuPageContent';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New menu item',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: { parentId?: string };
}

async function NewCultureMenuItemPage({ searchParams }: PageProps) {
  const user = await requireAdmin();
  const parentId = searchParams.parentId?.trim() || undefined;

  const [parents, parent] = await Promise.all([
    prisma.cultureMenuItem.findMany({
      where: { parentId: null },
      orderBy: { order: 'asc' },
      select: { id: true, title: true },
    }),
    parentId
      ? prisma.cultureMenuItem.findUnique({
          where: { id: parentId },
          select: { title: true },
        })
      : Promise.resolve(null),
  ]);

  return (
    <CultureMenuPageContent
      user={user}
      modal={
        <CultureMenuCreateModal
          parents={parents}
          defaultParentId={parentId}
          parentTitle={parent?.title}
        />
      }
    />
  );
}

export default NewCultureMenuItemPage;
