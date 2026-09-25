'use client';

import { useState } from 'react';
import { CultureMenuCatalogSheetForm } from '@/components/admin/CultureMenuCatalogSheetForm';
import { CultureCatalogEntriesPanel } from '@/components/admin/CultureCatalogEntriesPanel';
import { AdminFormTabs } from '@/components/admin/AdminFormTabs';
import type {
  CultureCatalogEntryAdmin,
  CultureCatalogSubpageLink,
} from '@/lib/admin/culture-catalog-entry';

interface CultureCatalogPageFormProps {
  menuItemId: string;
  menuPath: string;
  pageLabel: string;
  entries: CultureCatalogEntryAdmin[];
  subpageLinks: CultureCatalogSubpageLink[];
  managesGridCards: boolean;
}

export function CultureCatalogPageForm({
  menuItemId,
  menuPath,
  pageLabel,
  entries,
  subpageLinks,
  managesGridCards,
}: CultureCatalogPageFormProps) {
  const [activeTab, setActiveTab] = useState<'cards' | 'page'>(managesGridCards ? 'cards' : 'page');

  const tabs = managesGridCards
    ? [
        { id: 'cards', label: 'Grid cards', hint: 'Photos & monument text' },
        { id: 'page', label: 'Page layout', hint: 'Hero, about, labels' },
      ]
    : [{ id: 'page', label: 'Page layout', hint: 'Hero, about, labels' }];

  return (
    <div className="flex flex-col gap-6">
      <AdminFormTabs tabs={tabs} activeId={activeTab} onChange={(id) => setActiveTab(id as 'cards' | 'page')} />

      {activeTab === 'cards' ? (
        <CultureCatalogEntriesPanel
          menuItemId={menuItemId}
          menuPath={menuPath}
          pageLabel={pageLabel}
          entries={entries}
          subpageLinks={subpageLinks}
          managesGridCards={managesGridCards}
        />
      ) : null}

      {activeTab === 'page' ? <CultureMenuCatalogSheetForm menuPath={menuPath} /> : null}
    </div>
  );
}
