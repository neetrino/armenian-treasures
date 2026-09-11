'use client';

import { useEffect, useState } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { decodeTranslatableText, type LocaleTextMap } from '@/lib/i18n/translatable-content';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

interface AdminLocaleAwareTextFieldProps {
  name: string;
  label: string;
  encodedValue?: string;
  activeLocale: SiteLocaleCode;
  hint?: string;
  error?: string;
}

function valueFor(values: LocaleTextMap, locale: SiteLocaleCode): string {
  return values[locale] ?? '';
}

export function AdminLocaleAwareTextField({
  name,
  label,
  encodedValue = '',
  activeLocale,
  hint,
  error,
}: AdminLocaleAwareTextFieldProps) {
  const [values, setValues] = useState<LocaleTextMap>(() => decodeTranslatableText(encodedValue));

  useEffect(() => {
    setValues(decodeTranslatableText(encodedValue));
  }, [encodedValue]);

  return (
    <>
      {SITE_LOCALE_CODES.map((code) => {
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
      })}
      <TextField
        label={label}
        name={`${name}.${activeLocale}`}
        value={valueFor(values, activeLocale)}
        onChange={(event) =>
          setValues((current) => ({ ...current, [activeLocale]: event.target.value }))
        }
        hint={hint}
        error={error}
      />
    </>
  );
}
