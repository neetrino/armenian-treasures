'use client';

import { useState } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { CULTURE_ITEM_TYPE_OPTIONS } from '@/lib/admin/enum-labels';
import type { CultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';

interface CultureItemBasicsFieldsProps {
  initial?: CultureItemFormInitial;
  fieldErrors?: Record<string, string>;
}

export function CultureItemBasicsFields({
  initial,
  fieldErrors,
}: CultureItemBasicsFieldsProps) {
  const [itemType, setItemType] = useState(initial?.itemType ?? 'OTHER');

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <TextField
        label="Slug"
        name="slug"
        defaultValue={initial?.slug ?? ''}
        hint="Lowercase, hyphenated. Leave empty to derive from title."
        error={fieldErrors?.slug}
      />
      <SelectField
        label="Item type"
        name="itemType"
        options={CULTURE_ITEM_TYPE_OPTIONS}
        value={itemType}
        onChange={(event) => setItemType(event.target.value)}
        error={fieldErrors?.itemType}
      />
      <TextField label="Region" name="region" defaultValue={initial?.region ?? ''} error={fieldErrors?.region} />
      <TextField
        label="Period label"
        name="periodLabel"
        defaultValue={initial?.periodLabel ?? ''}
        hint='e.g. "9th c." or "782 BC"'
        error={fieldErrors?.periodLabel}
      />
      <TextField
        label="Order"
        name="order"
        type="number"
        min={0}
        defaultValue={initial?.order ?? 0}
        error={fieldErrors?.order}
      />
    </div>
  );
}
