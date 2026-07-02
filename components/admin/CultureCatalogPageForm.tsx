'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CultureMenuCatalogSheetForm } from '@/components/admin/CultureMenuCatalogSheetForm';
import { CultureCatalogEntriesPanel } from '@/components/admin/CultureCatalogEntriesPanel';
import { AdminFormTabs } from '@/components/admin/AdminFormTabs';
import { Button } from '@/components/ui/Button';
import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import type {
  CultureCatalogEntryAdmin,
  CultureCatalogSubpageLink,
} from '@/lib/admin/culture-catalog-entry';
import {
  saveCultureCatalogPageAction,
  type CultureCatalogPageFormState,
} from '@/app/(admin)/admin/(panel)/culture-pages/actions';

const INITIAL: CultureCatalogPageFormState = { status: 'idle' };

interface CultureCatalogPageFormProps {
  menuItemId: string;
  menuPath: string;
  pageLabel: string;
  resolvedContent: CultureCatalogContent;
  catalogContent?: unknown;
  entries: CultureCatalogEntryAdmin[];
  subpageLinks: CultureCatalogSubpageLink[];
  managesGridCards: boolean;
}

export function CultureCatalogPageForm({
  menuItemId,
  menuPath,
  pageLabel,
  resolvedContent,
  catalogContent,
  entries,
  subpageLinks,
  managesGridCards,
}: CultureCatalogPageFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'cards' | 'page'>(managesGridCards ? 'cards' : 'page');
  const boundAction = saveCultureCatalogPageAction.bind(null, menuItemId, menuPath);
  const [state, formAction, isPending] = useActionState(boundAction, INITIAL);
  const lastSuccessRef = useRef<string | null>(null);

  useEffect(() => {
    if (state.status !== 'success' || !state.message) return;
    if (lastSuccessRef.current === state.message) return;
    lastSuccessRef.current = state.message;
    router.refresh();
  }, [router, state.message, state.status]);

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

      {activeTab === 'page' ? (
        <form action={formAction} className="flex flex-col gap-6">
          <CultureMenuCatalogSheetForm
            resolvedContent={resolvedContent}
            catalogContent={catalogContent}
          />

          {state.status === 'error' && state.message ? (
            <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
          ) : null}
          {state.status === 'success' ? (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
          ) : null}

          <div className="sticky bottom-0 -mx-6 border-t border-stone-100 bg-white/95 px-6 py-4 backdrop-blur-sm">
            <Button type="submit" disabled={isPending} withArrow>
              {isPending ? 'Saving…' : 'Save page layout'}
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
