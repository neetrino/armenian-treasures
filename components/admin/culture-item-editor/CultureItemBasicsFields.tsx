'use client';

import { useState } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { AdminLocaleAwareTextField } from '@/components/forms/fields/AdminLocaleAwareTextField';
import { CULTURE_ITEM_TYPE_OPTIONS } from '@/lib/admin/enum-labels';
import type { CultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

interface CultureItemBasicsFieldsProps {
  initial?: CultureItemFormInitial;
  fieldErrors?: Record<string, string>;
  activeLocale: SiteLocaleCode;
}

export function CultureItemBasicsFields({
  initial,
  fieldErrors,
  activeLocale,
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
      <AdminLocaleAwareTextField
        label="Region"
        name="region"
        encodedValue={initial?.region ?? ''}
        activeLocale={activeLocale}
        error={fieldErrors?.region}
      />
      <AdminLocaleAwareTextField
        label="Period label"
        name="periodLabel"
        encodedValue={initial?.periodLabel ?? ''}
        activeLocale={activeLocale}
        hint='e.g. "9th c." or "782 BC"'
        error={fieldErrors?.periodLabel}
      />
    </div>
  );
}
