'use client';

import { useCallback, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
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
      <AdminTopbar title="Culture menu" user={user} />
      <div className="relative flex flex-1 flex-col gap-6 p-6">
        <div className="flex justify-end">
          <Button type="button" variant="primary" onClick={() => openCreateModal(null)}>
            <Plus size={14} aria-hidden /> Add Category
          </Button>
        </div>
        <CultureMenuTree tree={tree} onAddChild={(parentId) => openCreateModal(parentId)} />
        {isCreateModalOpen ? (
          <CultureMenuCreateModal
            parents={parents}
            defaultParentId={selectedParentId ?? undefined}
            parentTitle={parentTitle}
            onClose={closeCreateModal}
          />
        ) : null}
      </div>
    </>
  );
}
