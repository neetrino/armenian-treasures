'use client';

import { useEffect, useMemo, useState } from 'react';
import { PageContentImageField } from '@/components/admin/page-content/PageContentImageField';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import {
  cultureCatalogContentToOverride,
  menuCatalogContentToFormDefaults,
  parseMenuCatalogContent,
} from '@/lib/types/culture-catalog-content';

interface CultureMenuCatalogFieldsProps {
  catalogContent?: unknown;
  resolvedContent?: CultureCatalogContent | null;
  fieldErrors?: Record<string, string>;
}

function resolveFormDefaults(
  catalogContent: unknown,
  resolvedContent: CultureCatalogContent | null | undefined,
): Record<string, string> {
  const parsed = parseMenuCatalogContent(catalogContent);
  if (resolvedContent) {
    return menuCatalogContentToFormDefaults(cultureCatalogContentToOverride(resolvedContent));
  }
  return menuCatalogContentToFormDefaults(parsed);
}

export function CultureMenuCatalogFields({
  catalogContent,
  resolvedContent,
  fieldErrors,
}: CultureMenuCatalogFieldsProps) {
  const defaults = useMemo(
    () => resolveFormDefaults(catalogContent, resolvedContent),
    [catalogContent, resolvedContent],
  );
  const defaultsKey = useMemo(() => JSON.stringify(defaults), [defaults]);
  const [values, setValues] = useState(defaults);

  useEffect(() => {
    setValues(defaults);
  }, [defaultsKey, defaults]);

  const setField = (name: string, value: string): void => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-stone-100 bg-parchment-50 p-5">
      <div>
        <h3 className="font-display text-xl text-ink">Catalog page content</h3>
        <p className="mt-1 text-xs text-ink-muted">
          Overrides the public culture catalog hero, about section, and labels for this menu item.
          Leave blank to use built-in defaults. Card image URL above is also used as hero fallback.
        </p>
      </div>

      <input type="hidden" name="catalogHeroImage" value={values.catalogHeroImage ?? ''} readOnly />
      <PageContentImageField
        label="Hero banner image"
        layout="banner"
        value={values.catalogHeroImage ?? ''}
        onChange={(url) => setField('catalogHeroImage', url)}
        hint="Compact preview with the same wide crop as the live page."
      />
      {fieldErrors?.catalogHeroImage ? (
        <p className="-mt-3 text-xs text-pomegranate">{fieldErrors.catalogHeroImage}</p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Hero eyebrow"
          name="catalogEyebrow"
          value={values.catalogEyebrow ?? ''}
          onChange={(event) => setField('catalogEyebrow', event.target.value)}
          error={fieldErrors?.catalogEyebrow}
        />
        <TextField
          label="Hero accent (subtitle line)"
          name="catalogAccent"
          value={values.catalogAccent ?? ''}
          onChange={(event) => setField('catalogAccent', event.target.value)}
          error={fieldErrors?.catalogAccent}
        />
        <TextField
          label="Hero slogan"
          name="catalogSlogan"
          value={values.catalogSlogan ?? ''}
          onChange={(event) => setField('catalogSlogan', event.target.value)}
          error={fieldErrors?.catalogSlogan}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="About label"
          name="catalogAboutLabel"
          value={values.catalogAboutLabel ?? ''}
          onChange={(event) => setField('catalogAboutLabel', event.target.value)}
        />
        <TextField
          label="About title"
          name="catalogAboutTitle"
          value={values.catalogAboutTitle ?? ''}
          onChange={(event) => setField('catalogAboutTitle', event.target.value)}
        />
        <div className="sm:col-span-2">
          <TextareaField
            label="About description"
            name="catalogAboutDescription"
            rows={3}
            value={values.catalogAboutDescription ?? ''}
            onChange={(event) => setField('catalogAboutDescription', event.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <TextareaField
            label="About paragraphs"
            name="catalogAboutParagraphs"
            rows={5}
            value={values.catalogAboutParagraphs ?? ''}
            onChange={(event) => setField('catalogAboutParagraphs', event.target.value)}
            hint="Separate paragraphs with a blank line."
          />
        </div>
        <TextField
          label="Extra heading"
          name="catalogExtraHeading"
          value={values.catalogExtraHeading ?? ''}
          onChange={(event) => setField('catalogExtraHeading', event.target.value)}
        />
        <TextareaField
          label="Extra paragraph"
          name="catalogExtraParagraph"
          rows={3}
          value={values.catalogExtraParagraph ?? ''}
          onChange={(event) => setField('catalogExtraParagraph', event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="grid gap-3 rounded-xl border border-stone-100 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-bronze-700">
              Fact {index}
            </p>
            <TextField
              label="Label"
              name={`catalogFact${index}Label`}
              value={values[`catalogFact${index}Label`] ?? ''}
              onChange={(event) => setField(`catalogFact${index}Label`, event.target.value)}
            />
            <TextareaField
              label="Value"
              name={`catalogFact${index}Value`}
              rows={2}
              value={values[`catalogFact${index}Value`] ?? ''}
              onChange={(event) => setField(`catalogFact${index}Value`, event.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Entries section label"
          name="catalogItemsLabel"
          value={values.catalogItemsLabel ?? ''}
          onChange={(event) => setField('catalogItemsLabel', event.target.value)}
        />
        <TextField
          label="Entries section title"
          name="catalogItemsTitle"
          value={values.catalogItemsTitle ?? ''}
          onChange={(event) => setField('catalogItemsTitle', event.target.value)}
        />
        <div className="sm:col-span-2">
          <TextareaField
            label="Entries section description"
            name="catalogItemsDescription"
            rows={3}
            value={values.catalogItemsDescription ?? ''}
            onChange={(event) => setField('catalogItemsDescription', event.target.value)}
          />
        </div>
        <TextField
          label="Submit prompt"
          name="catalogSubmitPrompt"
          value={values.catalogSubmitPrompt ?? ''}
          onChange={(event) => setField('catalogSubmitPrompt', event.target.value)}
        />
        <TextField
          label="Empty state message"
          name="catalogEmptyMessage"
          value={values.catalogEmptyMessage ?? ''}
          onChange={(event) => setField('catalogEmptyMessage', event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Map eyebrow"
          name="catalogMapEyebrow"
          value={values.catalogMapEyebrow ?? ''}
          onChange={(event) => setField('catalogMapEyebrow', event.target.value)}
        />
        <TextField
          label="Map title"
          name="catalogMapTitle"
          value={values.catalogMapTitle ?? ''}
          onChange={(event) => setField('catalogMapTitle', event.target.value)}
        />
        <div className="sm:col-span-2">
          <TextareaField
            label="Map description"
            name="catalogMapDescription"
            rows={3}
            value={values.catalogMapDescription ?? ''}
            onChange={(event) => setField('catalogMapDescription', event.target.value)}
          />
        </div>
        <TextField
          label="Map placeholder title"
          name="catalogMapPlaceholder"
          value={values.catalogMapPlaceholder ?? ''}
          onChange={(event) => setField('catalogMapPlaceholder', event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <TextField
          label="Stat: entries label"
          name="catalogStatEntries"
          value={values.catalogStatEntries ?? ''}
          onChange={(event) => setField('catalogStatEntries', event.target.value)}
        />
        <TextField
          label="Stat: regions label"
          name="catalogStatRegions"
          value={values.catalogStatRegions ?? ''}
          onChange={(event) => setField('catalogStatRegions', event.target.value)}
        />
        <TextField
          label="Stat: third label"
          name="catalogStatThird"
          value={values.catalogStatThird ?? ''}
          onChange={(event) => setField('catalogStatThird', event.target.value)}
        />
        <TextField
          label="Stat: fourth label"
          name="catalogStatFourth"
          value={values.catalogStatFourth ?? ''}
          onChange={(event) => setField('catalogStatFourth', event.target.value)}
        />
      </div>
    </section>
  );
}
