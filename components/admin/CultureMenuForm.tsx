'use client';

import { useActionState, useEffect } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { Button } from '@/components/ui/Button';
import {
  createMenuItemAction,
  updateMenuItemAction,
  type MenuFormState,
} from '@/app/(admin)/admin/(panel)/culture-menu/actions';

interface MenuFormProps {
  mode: 'create' | 'edit';
  itemId?: string;
  initial?: {
    title: string;
    slug: string;
    description: string;
    parentId: string;
    order: number;
    isActive: boolean;
    image: string;
    routeType: string;
    customUrl: string;
  };
  parents: { id: string; title: string }[];
  defaultParentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ROUTE_OPTIONS = [
  { value: 'CATEGORY', label: 'Category (renders catalog)' },
  { value: 'SUBCATEGORY', label: 'Subcategory (renders items)' },
  { value: 'SUBCATEGORY_FORM', label: '+ Form: sub-catalog proposal' },
  { value: 'PROJECT_SUBMIT_FORM', label: '+ Form: project submission' },
  { value: 'CUSTOM_URL', label: 'Custom URL' },
];

const INITIAL: MenuFormState = { status: 'idle' };

export function CultureMenuForm({
  mode,
  itemId,
  initial,
  parents,
  defaultParentId,
  onSuccess,
  onCancel,
}: MenuFormProps) {
  const updateBound = itemId
    ? updateMenuItemAction.bind(null, itemId)
    : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createMenuItemAction,
    INITIAL,
  );

  useEffect(() => {
    if (mode === 'create' && state.status === 'success') {
      onSuccess?.();
    }
  }, [mode, state.status, onSuccess]);

  const parentOptions = [
    { value: '', label: 'Top-level (no parent)' },
    ...parents
      .filter((p) => (itemId ? p.id !== itemId : true))
      .map((p) => ({ value: p.id, label: p.title })),
  ];

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Title"
          name="title"
          required
          defaultValue={initial?.title ?? ''}
          error={state.fieldErrors?.title}
        />
        <TextField
          label="Slug (leave empty to derive from title)"
          name="slug"
          defaultValue={initial?.slug ?? ''}
          error={state.fieldErrors?.slug}
          hint="Lowercase letters, numbers and hyphens"
        />
        <SelectField
          label="Parent"
          name="parentId"
          options={parentOptions}
          defaultValue={initial?.parentId ?? defaultParentId ?? ''}
          error={state.fieldErrors?.parentId}
        />
        <SelectField
          label="Route type"
          name="routeType"
          options={ROUTE_OPTIONS}
          defaultValue={initial?.routeType ?? 'CATEGORY'}
          error={state.fieldErrors?.routeType}
        />
        <TextField
          label="Order"
          name="order"
          type="number"
          min={0}
          defaultValue={initial?.order ?? 0}
          error={state.fieldErrors?.order}
        />
        <TextField
          label="Image URL (optional)"
          name="image"
          defaultValue={initial?.image ?? ''}
          error={state.fieldErrors?.image}
        />
        <TextField
          label="Custom URL (only when route type = Custom URL)"
          name="customUrl"
          defaultValue={initial?.customUrl ?? ''}
          error={state.fieldErrors?.customUrl}
        />
        <label className="flex items-center gap-2 pt-6 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={initial?.isActive ?? true}
            className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
          />
          Visible in public menu
        </label>
      </div>
      <TextareaField
        label="Description (optional)"
        name="description"
        rows={3}
        defaultValue={initial?.description ?? ''}
        error={state.fieldErrors?.description}
      />
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} withArrow>
          {isPending
            ? 'Saving…'
            : mode === 'create'
              ? 'Create menu item'
              : 'Save changes'}
        </Button>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
