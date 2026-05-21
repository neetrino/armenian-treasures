import Link from 'next/link';
import type { Metadata } from 'next';
import { Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CultureMenuTree } from '@/components/admin/CultureMenuTree';
import { ButtonLink } from '@/components/ui/Button';
import { requireAdmin } from '@/lib/auth/require-admin';
import { buildMenuTree, type MenuNode } from '@/lib/culture-menu';
import { prisma } from '@/lib/db';
import { toPublicMenuItem } from '@/lib/dto';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Culture menu',
  robots: { index: false, follow: false },
};

async function AdminCultureMenuPage() {
  const user = await requireAdmin();
  const rows = await prisma.cultureMenuItem.findMany({
    orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
  });
  const tree = buildMenuTree(rows.map(toPublicMenuItem) as unknown as MenuNode[]);
  return (
    <>
      <AdminTopbar title="Culture menu" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Culture Portal menu"
          description="Edit the hierarchical menu that powers the public culture portal. Two levels deep — categories and subcategories — plus special form-link nodes."
          actions={
            <ButtonLink href="/admin/culture-menu/new" variant="primary">
              <Plus size={14} aria-hidden /> Add top-level
            </ButtonLink>
          }
        />
        <div className="flex flex-col gap-3 rounded-2xl border border-stone-100 bg-parchment-50 p-4 text-xs text-ink-muted">
          <p>
            Drag-and-drop is not enabled here. Use the up/down arrows to reorder siblings, or
            edit the order field directly on each item.
          </p>
          <p>
            Form-link nodes (<span className="font-medium">+ Form</span>) are special routes that
            render the public submission forms — not catalog content. Edit them through the same
            form by changing the route type.
          </p>
        </div>
        <CultureMenuTree tree={tree} />
        <p className="text-xs text-ink-muted">
          Need to add a child under a specific parent?{' '}
          <Link className="text-pomegranate hover:underline" href="/admin/culture-menu">
            Use the &quot;Child&quot; action on the parent row above.
          </Link>
        </p>
      </div>
    </>
  );
}

export default AdminCultureMenuPage;
