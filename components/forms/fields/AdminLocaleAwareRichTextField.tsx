'use client';

import { useEffect, useState } from 'react';
import { RichTextField } from '@/components/forms/fields/RichTextField';
import { decodeTranslatableText, type LocaleTextMap } from '@/lib/i18n/translatable-content';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

interface AdminLocaleAwareRichTextFieldProps {
  name?: string;
  label: string;
  encodedValue?: string;
  values?: LocaleTextMap;
  onValuesChange?: (values: LocaleTextMap) => void;
  activeLocale: SiteLocaleCode;
  hint?: string;
  error?: string;
  compact?: boolean;
}

function valueFor(values: LocaleTextMap, locale: SiteLocaleCode): string {
  return values[locale] ?? '';
}

export function AdminLocaleAwareRichTextField({
  name,
  label,
  encodedValue = '',
  values: controlledValues,
  onValuesChange,
  activeLocale,
  hint,
  error,
  compact = true,
}: AdminLocaleAwareRichTextFieldProps) {
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
      <RichTextField
        label={label}
        name={name ? `${name}.${activeLocale}` : undefined}
        compact={compact}
        value={valueFor(values, activeLocale)}
        onValueChange={(next) => setValues({ ...values, [activeLocale]: next })}
        hint={hint}
        error={error}
      />
    </>
  );
}
