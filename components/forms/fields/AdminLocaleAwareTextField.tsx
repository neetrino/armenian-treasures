'use client';

import { useEffect, useState } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { decodeTranslatableText, type LocaleTextMap } from '@/lib/i18n/translatable-content';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

interface AdminLocaleAwareTextFieldProps {
  name?: string;
  label: string;
  encodedValue?: string;
  values?: LocaleTextMap;
  onValuesChange?: (values: LocaleTextMap) => void;
  activeLocale: SiteLocaleCode;
  hint?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

function valueFor(values: LocaleTextMap, locale: SiteLocaleCode): string {
  return values[locale] ?? '';
}

export function AdminLocaleAwareTextField({
  name,
  label,
  encodedValue = '',
  values: controlledValues,
  onValuesChange,
  activeLocale,
  hint,
  error,
  required,
  multiline = false,
  rows = 1,
}: AdminLocaleAwareTextFieldProps) {
  const isControlled = controlledValues !== undefined;
  const [internalValues, setInternalValues] = useState<LocaleTextMap>(() =>
    decodeTranslatableText(encodedValue),
  );

  useEffect(() => {
    if (isControlled) return;
    setInternalValues(decodeTranslatableText(encodedValue));
  }, [encodedValue, isControlled]);

  const values = isControlled ? controlledValues : internalValues;

  function setValues(next: LocaleTextMap): void {
    if (!isControlled) setInternalValues(next);
    onValuesChange?.(next);
  }

  const fieldName = name ? `${name}.${activeLocale}` : undefined;
  const currentValue = valueFor(values, activeLocale);

  return (
    <>
      {name
        ? SITE_LOCALE_CODES.map((code) => {
            if (code === activeLocale) return null;
            return (
              <input
                key={code}
                type="hidden"
                name={`${name}.${code}`}
                value={valueFor(values, code)}
                readOnly
              />
            );
          })
        : null}
      {multiline ? (
        <TextareaField
          label={label}
          name={fieldName}
          required={required}
          rows={rows}
          value={currentValue}
          onChange={(event) => setValues({ ...values, [activeLocale]: event.target.value })}
          hint={hint}
          error={error}
          textareaClassName={rows === 1 ? 'min-h-0 resize-none overflow-hidden py-2.5' : undefined}
        />
      ) : (
        <TextField
          label={label}
          name={fieldName}
          required={required}
          value={currentValue}
          onChange={(event) => setValues({ ...values, [activeLocale]: event.target.value })}
          hint={hint}
          error={error}
        />
      )}
    </>
  );
}
