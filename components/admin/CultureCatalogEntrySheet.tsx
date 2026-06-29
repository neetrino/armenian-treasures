'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSheet } from '@/components/admin/AdminSheet';
import { CultureCatalogEntryFormFields } from '@/components/admin/CultureCatalogEntryFormFields';
import { Button } from '@/components/ui/Button';
import {
  createCultureCatalogEntryAction,
  saveCultureCatalogEntryAction,
  type CultureCatalogEntryFormState,
} from '@/app/(admin)/admin/(panel)/culture-pages/actions';
import type { CultureCatalogEntryAdmin } from '@/lib/admin/culture-catalog-entry';

const INITIAL: CultureCatalogEntryFormState = { status: 'idle' };

type SheetMode =
  | { type: 'edit'; entry: CultureCatalogEntryAdmin; index: number }
  | { type: 'create' };

interface CultureCatalogEntrySheetProps {
  open: boolean;
  onClose: () => void;
  mode: SheetMode | null;
  menuItemId: string;
  menuPath: string;
  nextOrder: number;
}

function EntrySheetForm({
  mode,
  menuItemId,
  menuPath,
  nextOrder,
  onClose,
}: {
  mode: SheetMode;
  menuItemId: string;
  menuPath: string;
  nextOrder: number;
  onClose: () => void;
}) {
  const router = useRouter();
  const isEdit = mode.type === 'edit';
  const entry = isEdit ? mode.entry : null;

  const boundAction = isEdit
    ? saveCultureCatalogEntryAction.bind(null, mode.entry.id, menuItemId, menuPath)
    : createCultureCatalogEntryAction.bind(null, menuItemId, menuPath);

  const [state, formAction, isPending] = useActionState(boundAction, INITIAL);
  const [image, setImage] = useState(entry?.image ?? '');
  const lastSuccessRef = useRef<string | null>(null);

  useEffect(() => {
    setImage(entry?.image ?? '');
  }, [entry?.image, mode.type]);

  useEffect(() => {
    if (state.status !== 'success' || !state.message) return;
    if (lastSuccessRef.current === state.message) return;
    lastSuccessRef.current = state.message;
    onClose();
    router.refresh();
  }, [onClose, router, state.message, state.status]);

  const cardNumber = isEdit ? String(mode.index + 1).padStart(2, '0') : null;

  return (
    <AdminSheet
      open
      onClose={onClose}
      eyebrow={isEdit ? `Grid card ${cardNumber}` : 'New entry'}
      title={isEdit ? entry?.title ?? 'Edit card' : 'Add grid card'}
      description={
        isEdit
          ? 'Update the photo and text shown on the public monument grid.'
          : 'Create a new card on the public page grid.'
      }
      size="2xl"
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-[1.25rem] text-sm">
            {state.status === 'error' && state.message ? (
              <p className="text-pomegranate">{state.message}</p>
            ) : null}
          </div>
          <div className="flex gap-2 sm:justify-end">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="culture-entry-sheet-form" disabled={isPending} withArrow>
              {isPending ? 'Saving…' : isEdit ? 'Save card' : 'Add card'}
            </Button>
          </div>
        </div>
      }
    >
      <form id="culture-entry-sheet-form" action={formAction}>
        <CultureCatalogEntryFormFields
          image={image}
          onImageChange={setImage}
          orderHidden={isEdit ? undefined : nextOrder}
          defaultValues={
            isEdit && entry
              ? {
                  title: entry.title,
                  order: entry.order,
                  region: entry.region,
                  periodLabel: entry.periodLabel,
                  tourUrl: entry.tourUrl,
                  status: entry.status,
                  description: entry.description,
                }
              : { status: 'PUBLISHED' }
          }
          fieldErrors={state.fieldErrors}
        />
      </form>
    </AdminSheet>
  );
}

export function CultureCatalogEntrySheet({
  open,
  onClose,
  mode,
  menuItemId,
  menuPath,
  nextOrder,
}: CultureCatalogEntrySheetProps) {
  if (!open || !mode) return null;

  return (
    <EntrySheetForm
      key={mode.type === 'edit' ? mode.entry.id : 'create'}
      mode={mode}
      menuItemId={menuItemId}
      menuPath={menuPath}
      nextOrder={nextOrder}
      onClose={onClose}
    />
  );
}
