'use client';

import { useEffect, useState } from 'react';
import { SelectField } from '@/components/forms/fields/SelectField';
import { CultureItemEditorLocaleTabs } from '@/components/admin/culture-item-editor/CultureItemEditorLocaleTabs';
import { CultureItemEditorToggle } from '@/components/admin/culture-item-editor/CultureItemEditorToggle';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { TextField } from '@/components/forms/fields/TextField';
import { CULTURE_STATUS_OPTIONS } from '@/lib/admin/enum-labels';
import { decodeTranslatableText, type LocaleTextMap } from '@/lib/i18n/translatable-content';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

interface CultureItemEditorMetaBarProps {
  title?: string;
  shortDescription?: string;
  statusDefault: string;
  featuredOnCatalog?: boolean;
  featuredOnHome?: boolean;
  featuredOrder?: number | null;
  statusError?: string;
  featuredOrderError?: string;
  fieldErrors?: Record<string, string>;
  tabErrors?: Partial<Record<SiteLocaleCode, boolean>>;
}

const FEATURED_ORDER_OPTIONS = [
  { value: '1', label: '1 — first card' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5 — last card' },
];

function localeHasContent(title: string, shortDescription: string): boolean {
  return title.trim().length > 0 || shortDescription.trim().length > 0;
}

function valueFor(values: LocaleTextMap, locale: SiteLocaleCode): string {
  return values[locale] ?? '';
}

function patchLocaleMap(
  current: LocaleTextMap,
  locale: SiteLocaleCode,
  nextValue: string,
): LocaleTextMap {
  return { ...current, [locale]: nextValue };
}

export function CultureItemEditorMetaBar({
  title = '',
  shortDescription = '',
  statusDefault,
  featuredOnCatalog = false,
  featuredOnHome = false,
  featuredOrder = 5,
  statusError,
  featuredOrderError,
  fieldErrors,
  tabErrors,
}: CultureItemEditorMetaBarProps) {
  const [activeLocale, setActiveLocale] = useState<SiteLocaleCode>('EN');
  const [highlightOn, setHighlightOn] = useState(featuredOnHome);
  const [titleValues, setTitleValues] = useState<LocaleTextMap>(() => decodeTranslatableText(title));
  const [shortDescriptionValues, setShortDescriptionValues] = useState<LocaleTextMap>(() =>
    decodeTranslatableText(shortDescription),
  );

  useEffect(() => {
    setTitleValues(decodeTranslatableText(title));
  }, [title]);

  useEffect(() => {
    setShortDescriptionValues(decodeTranslatableText(shortDescription));
  }, [shortDescription]);

  const completedLocales = Object.fromEntries(
    SITE_LOCALE_CODES.map((code) => [
      code,
      localeHasContent(valueFor(titleValues, code), valueFor(shortDescriptionValues, code)),
    ]),
  ) as Partial<Record<SiteLocaleCode, boolean>>;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
      {SITE_LOCALE_CODES.map((code) => {
        if (code === activeLocale) return null;
        return (
          <div key={code} className="hidden" aria-hidden>
            <input type="hidden" name={`title.${code}`} value={valueFor(titleValues, code)} readOnly />
            <input
              type="hidden"
              name={`shortDescription.${code}`}
              value={valueFor(shortDescriptionValues, code)}
              readOnly
            />
          </div>
        );
      })}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <CultureItemEditorLocaleTabs
          activeLocale={activeLocale}
          completedLocales={completedLocales}
          tabErrors={tabErrors}
          onChange={setActiveLocale}
        />
        <div className="flex flex-wrap items-center gap-4 xl:justify-end">
          <div className="w-44">
            <SelectField
              label="Status"
              name="status"
              options={CULTURE_STATUS_OPTIONS}
              defaultValue={statusDefault}
              error={statusError}
            />
          </div>
          <CultureItemEditorToggle
            name="featuredOnCatalog"
            label="Featured Catalog"
            defaultChecked={featuredOnCatalog}
          />
          <CultureItemEditorToggle
            name="featuredOnHome"
            label="Featured Highlight"
            defaultChecked={featuredOnHome}
            onChange={setHighlightOn}
          />
        </div>
      </div>

      <div className="grid gap-4 border-t border-stone-100 pt-4 sm:grid-cols-2">
        <TextField
          key={`title-${activeLocale}`}
          label="Title"
          name={`title.${activeLocale}`}
          required={activeLocale === 'EN'}
          value={valueFor(titleValues, activeLocale)}
          onChange={(event) =>
            setTitleValues((current) => patchLocaleMap(current, activeLocale, event.target.value))
          }
          error={fieldErrors?.[`title.${activeLocale}`]}
        />
        <TextareaField
          key={`shortDescription-${activeLocale}`}
          label="Short description"
          name={`shortDescription.${activeLocale}`}
          rows={2}
          value={valueFor(shortDescriptionValues, activeLocale)}
          onChange={(event) =>
            setShortDescriptionValues((current) =>
              patchLocaleMap(current, activeLocale, event.target.value),
            )
          }
          error={fieldErrors?.[`shortDescription.${activeLocale}`]}
        />
      </div>

      {highlightOn ? (
        <div className="max-w-xs border-t border-stone-100 pt-4">
          <SelectField
            label="Home slot (1–5)"
            name="featuredOrder"
            options={FEATURED_ORDER_OPTIONS}
            defaultValue={String(featuredOrder ?? 5)}
            hint="Used when the homepage featured toggle is on. Keep slots unique."
            error={featuredOrderError}
          />
        </div>
      ) : (
        <input type="hidden" name="featuredOrder" value={String(featuredOrder ?? 5)} />
      )}
    </div>
  );
}
