'use client';

import { useCallback, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { CultureMenuCreateModal } from '@/components/admin/CultureMenuCreateModal';
import { CultureMenuTree } from '@/components/admin/CultureMenuTree';
import { Button } from '@/components/ui/Button';
import type { AdminContext } from '@/lib/auth/require-admin';
import type { MenuNode } from '@/lib/culture-menu';

interface CultureMenuPageClientProps {
  user: AdminContext;
  tree: MenuNode[];
  parents: { id: string; title: string }[];
}

function findNodeTitle(nodes: MenuNode[], id: string): string | undefined {
  for (const node of nodes) {
    if (node.id === id) return node.title;
    const childTitle = findNodeTitle(node.children ?? [], id);
    if (childTitle) return childTitle;
  }
  return undefined;
}

export function CultureMenuPageClient({ user, tree, parents }: CultureMenuPageClientProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  const openCreateModal = useCallback((parentId: string | null) => {
    setSelectedParentId(parentId);
    setIsCreateModalOpen(true);
  }, []);

  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
    setSelectedParentId(null);
  }, []);

  const parentTitle = useMemo(
    () => (selectedParentId ? findNodeTitle(tree, selectedParentId) : undefined),
    [selectedParentId, tree],
  );

  return (
    <>
      <AdminPageShell
        user={user}
        topbarTitle="Culture menu"
        title="Menu structure"
        description="Build the culture portal navigation tree — categories, subcategories, and custom links."
        size="wide"
        actions={
          <Button type="button" variant="primary" onClick={() => openCreateModal(null)}>
            <Plus size={14} aria-hidden /> Add category
          </Button>
        }
      >
        <AdminHelpCallout title="How the tree works">
          Top-level items are main culture categories. Use the + on each row to add subcategories. Page
          copy for catalog pages is edited under <strong>Culture → Culture page copy</strong>.
        </AdminHelpCallout>
        <AdminPanelCard padding="lg">
          <CultureMenuTree tree={tree} onAddChild={(parentId) => openCreateModal(parentId)} />
        </AdminPanelCard>
      </AdminPageShell>
      {isCreateModalOpen ? (
        <CultureMenuCreateModal
          parents={parents}
          defaultParentId={selectedParentId ?? undefined}
          parentTitle={parentTitle}
          onClose={closeCreateModal}
        />
      ) : null}
    </>
  );
}
