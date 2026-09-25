'use client';

import { useActionState, useState } from 'react';
import { PageContentImageField } from '@/components/admin/page-content/PageContentImageField';
import { TranslatableFieldsTabs } from '@/components/admin/TranslatableFieldsTabs';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import type { CatalogSectionId } from '@/lib/admin/catalog-section-document';
import { decodeTranslatableText } from '@/lib/i18n/translatable-content';
import {
  saveCultureCatalogSectionAction,
  type CultureCatalogSectionFormState,
} from '@/app/(admin)/admin/(panel)/culture-pages/section-actions';
const INITIAL: CultureCatalogSectionFormState = { status: 'idle' };

interface CultureCatalogSectionFormProps {
  menuItemId: string;
  menuPath: string;
  section: CatalogSectionId;
  fields: Record<string, string>;
}

const TEXT_FIELDS: Record<CatalogSectionId, Array<{ name: string; label: string; multiline?: boolean }>> = {
  hero: [
    { name: 'catalogEyebrow', label: 'Hero eyebrow' },
    { name: 'catalogAccent', label: 'Hero accent' },
    { name: 'catalogSlogan', label: 'Hero slogan' },
  ],
  about: [
    { name: 'catalogAboutLabel', label: 'About label' },
    { name: 'catalogAboutTitle', label: 'About title' },
    { name: 'catalogAboutDescription', label: 'About description', multiline: true },
    { name: 'catalogAboutParagraphs', label: 'About paragraphs', multiline: true },
    { name: 'catalogExtraHeading', label: 'Extra heading' },
    { name: 'catalogExtraParagraph', label: 'Extra paragraph', multiline: true },
  ],
  facts: [1, 2, 3, 4].flatMap((index) => [
    { name: `catalogFact${index}Label`, label: `Fact ${index} label` },
    { name: `catalogFact${index}Value`, label: `Fact ${index} value`, multiline: true },
  ]),
  entries: [
    { name: 'catalogItemsLabel', label: 'Section label' },
    { name: 'catalogItemsTitle', label: 'Section title' },
    { name: 'catalogItemsDescription', label: 'Section description', multiline: true },
    { name: 'catalogSubmitPrompt', label: 'Submit prompt' },
    { name: 'catalogEmptyMessage', label: 'Empty state message' },
  ],
  map: [
    { name: 'catalogMapEyebrow', label: 'Map eyebrow' },
    { name: 'catalogMapTitle', label: 'Map title' },
    { name: 'catalogMapDescription', label: 'Map description', multiline: true },
    { name: 'catalogMapPlaceholder', label: 'Map placeholder title' },
  ],
  stats: [
    { name: 'catalogStatEntries', label: 'Entries label' },
    { name: 'catalogStatRegions', label: 'Regions label' },
    { name: 'catalogStatThird', label: 'Third stat label' },
    { name: 'catalogStatFourth', label: 'Fourth stat label' },
  ],
};

export function CultureCatalogSectionForm({
  menuItemId,
  menuPath,
  section,
  fields,
}: CultureCatalogSectionFormProps) {
  const [heroImage, setHeroImage] = useState(fields.catalogHeroImage ?? '');
  const action = saveCultureCatalogSectionAction.bind(null, menuItemId, menuPath, section);
  const [state, formAction, pending] = useActionState(action, INITIAL);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input
          type="checkbox"
          name="catalogSectionEnabled"
          defaultChecked={fields.catalogSectionEnabled === 'on'}
          className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
        />
        Show this section on the public page
      </label>
      {section === 'hero' ? (
        <>
          <input type="hidden" name="catalogHeroImage" value={heroImage} />
          <PageContentImageField
            label="Hero banner image"
            layout="banner"
            value={heroImage}
            onChange={setHeroImage}
            hint="Same image for every language."
          />
        </>
      ) : null}
      <TranslatableFieldsTabs>
        {(locale) => (
          <div className="grid gap-4 sm:grid-cols-2">
            {TEXT_FIELDS[section].map((field) => {
              const value = decodeTranslatableText(fields[field.name] ?? '')[locale] ?? '';
              return (
                <div key={field.name} className={field.multiline ? 'sm:col-span-2' : undefined}>
                  {field.multiline ? (
                    <TextareaField
                      label={field.label}
                      name={`${field.name}.${locale}`}
                      rows={4}
                      defaultValue={value}
                      hint={field.name === 'catalogAboutParagraphs' ? 'Separate paragraphs with a blank line.' : undefined}
                    />
                  ) : (
                    <TextField label={field.label} name={`${field.name}.${locale}`} defaultValue={value} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </TranslatableFieldsTabs>
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      {state.status === 'success' ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={pending} withArrow>
        {pending ? 'Saving…' : 'Save section'}
      </Button>
    </form>
  );
}
