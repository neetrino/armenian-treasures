'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { Button } from '@/components/ui/Button';
import {
  createCultureItemAction,
  updateCultureItemAction,
  type CultureItemFormState,
} from '@/app/(admin)/admin/(panel)/culture-items/actions';

interface MenuOption {
  id: string;
  title: string;
}

interface Initial {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  menuItemId: string;
  region: string;
  locationName: string;
  periodLabel: string;
  century: string;
  yearLabel: string;
  image: string;
  tourUrl: string;
  videoUrl: string;
  latitude: string;
  longitude: string;
  mapType: string;
  showOnMap: boolean;
  itemType: string;
  status: string;
  order: number;
}

interface CultureItemFormProps {
  mode: 'create' | 'edit';
  itemId?: string;
  menuOptions: MenuOption[];
  initial?: Initial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ITEM_TYPES = [
  'MONUMENT', 'MUSEUM', 'PERSON', 'LEGEND', 'HISTORY_EVENT', 'HERITAGE_OBJECT',
  'PUBLICATION', 'MUSIC', 'FOOD', 'DANCE', 'THEATRE', 'OTHER',
];

const MAP_TYPES = ['MONASTERY', 'FORTRESS', 'MUSEUM', 'CHURCH', 'ARCHAEOLOGICAL', 'OTHER'];
const STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

const INITIAL: CultureItemFormState = { status: 'idle' };

export function CultureItemForm({
  mode,
  itemId,
  menuOptions,
  initial,
  onSuccess,
  onCancel,
}: CultureItemFormProps) {
  const router = useRouter();
  const updateBound = itemId ? updateCultureItemAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createCultureItemAction,
    INITIAL,
  );

  useEffect(() => {
    if (state.status === 'success') {
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    }
  }, [state.status, onSuccess, router]);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <section className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Title"
          name="title"
          required
          defaultValue={initial?.title ?? ''}
          error={state.fieldErrors?.title}
        />
        <TextField
          label="Slug"
          name="slug"
          defaultValue={initial?.slug ?? ''}
          hint="Lowercase, hyphenated. Leave empty to derive from title."
          error={state.fieldErrors?.slug}
        />
        <SelectField
          label="Menu item"
          name="menuItemId"
          required
          options={[
            { value: '', label: 'Select a menu item…', disabled: true },
            ...menuOptions.map((m) => ({ value: m.id, label: m.title })),
          ]}
          defaultValue={initial?.menuItemId ?? ''}
          error={state.fieldErrors?.menuItemId}
        />
        <SelectField
          label="Item type"
          name="itemType"
          options={ITEM_TYPES.map((t) => ({ value: t, label: t }))}
          defaultValue={initial?.itemType ?? 'OTHER'}
          error={state.fieldErrors?.itemType}
        />
        <TextField
          label="Region"
          name="region"
          defaultValue={initial?.region ?? ''}
          error={state.fieldErrors?.region}
        />
        <TextField
          label="Location name"
          name="locationName"
          defaultValue={initial?.locationName ?? ''}
          error={state.fieldErrors?.locationName}
        />
        <TextField
          label="Period label"
          name="periodLabel"
          defaultValue={initial?.periodLabel ?? ''}
          hint='e.g. "9th c." or "782 BC"'
          error={state.fieldErrors?.periodLabel}
        />
        <TextField
          label="Century (negative for BC)"
          name="century"
          type="number"
          defaultValue={initial?.century ?? ''}
          error={state.fieldErrors?.century}
        />
        <TextField
          label="Year label"
          name="yearLabel"
          defaultValue={initial?.yearLabel ?? ''}
          error={state.fieldErrors?.yearLabel}
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
          label="Image URL"
          name="image"
          defaultValue={initial?.image ?? ''}
          error={state.fieldErrors?.image}
        />
        <SelectField
          label="Status"
          name="status"
          options={STATUSES.map((s) => ({ value: s, label: s }))}
          defaultValue={initial?.status ?? 'PUBLISHED'}
          error={state.fieldErrors?.status}
        />
      </section>

      <TextareaField
        label="Short description"
        name="shortDescription"
        rows={2}
        defaultValue={initial?.shortDescription ?? ''}
        error={state.fieldErrors?.shortDescription}
      />
      <TextareaField
        label="Description"
        name="description"
        rows={6}
        defaultValue={initial?.description ?? ''}
        error={state.fieldErrors?.description}
      />

      <section className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <h3 className="font-display text-xl text-ink">Map &amp; media</h3>
        <p className="mt-1 text-xs text-ink-muted">
          Set coordinates and toggle visibility on the public map.
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <TextField
            label="Latitude"
            name="latitude"
            type="number"
            step="any"
            defaultValue={initial?.latitude ?? ''}
            error={state.fieldErrors?.latitude}
          />
          <TextField
            label="Longitude"
            name="longitude"
            type="number"
            step="any"
            defaultValue={initial?.longitude ?? ''}
            error={state.fieldErrors?.longitude}
          />
          <SelectField
            label="Map type"
            name="mapType"
            options={[
              { value: '', label: '— None —' },
              ...MAP_TYPES.map((t) => ({ value: t, label: t })),
            ]}
            defaultValue={initial?.mapType ?? ''}
            error={state.fieldErrors?.mapType}
          />
          <label className="flex items-center gap-2 pt-7 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="showOnMap"
              defaultChecked={initial?.showOnMap ?? false}
              className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
            />
            Show on public map
          </label>
          <TextField
            label="3D tour URL"
            name="tourUrl"
            defaultValue={initial?.tourUrl ?? ''}
            error={state.fieldErrors?.tourUrl}
          />
          <TextField
            label="Video URL"
            name="videoUrl"
            defaultValue={initial?.videoUrl ?? ''}
            error={state.fieldErrors?.videoUrl}
          />
        </div>
      </section>

      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} withArrow>
          {isPending ? 'Saving…' : mode === 'create' ? 'Create item' : 'Save changes'}
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
