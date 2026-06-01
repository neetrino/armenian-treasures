import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { CultureMenuTree } from '@/components/admin/CultureMenuTree';
import { ButtonLink } from '@/components/ui/Button';
import type { AdminContext } from '@/lib/auth/require-admin';
import { buildMenuTree, type MenuNode } from '@/lib/culture-menu';
import { prisma } from '@/lib/db';
import { toPublicMenuItem } from '@/lib/dto';

interface CultureMenuPageContentProps {
  user: AdminContext;
  modal?: ReactNode;
}

export async function CultureMenuPageContent({ user, modal }: CultureMenuPageContentProps) {
  const rows = await prisma.cultureMenuItem.findMany({
    orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
  });
  const tree = buildMenuTree(rows.map(toPublicMenuItem) as unknown as MenuNode[]);

  return (
    <>
      <AdminTopbar title="Culture menu" user={user} />
      <div className="relative flex flex-1 flex-col gap-6 p-6">
        <div className="flex justify-end">
          <ButtonLink href="/admin/culture-menu/new" variant="primary">
            <Plus size={14} aria-hidden /> Add Category
          </ButtonLink>
        </div>
        <CultureMenuTree tree={tree} />
        {modal}
      </div>
    </>
  );
}
