'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  BarChart3,
  BookOpen,
  ImageIcon,
  LayoutGrid,
  ListOrdered,
  Map,
} from 'lucide-react';
import { AdminSectionCard } from '@/components/admin/AdminSectionCard';
import { AdminSheet } from '@/components/admin/AdminSheet';
import { PageContentImageField } from '@/components/admin/page-content/PageContentImageField';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import {
  cultureCatalogContentToOverride,
  menuCatalogContentToFormDefaults,
  parseMenuCatalogContent,
} from '@/lib/types/culture-catalog-content';

type SectionId = 'hero' | 'about' | 'facts' | 'entries' | 'map' | 'stats';

interface CultureMenuCatalogSheetFormProps {
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

function HiddenCatalogFields({ values }: { values: Record<string, string> }) {
  return (
    <>
      {Object.entries(values).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} readOnly />
      ))}
    </>
  );
}

export function CultureMenuCatalogSheetForm({
  catalogContent,
  resolvedContent,
  fieldErrors,
}: CultureMenuCatalogSheetFormProps) {
  const defaults = useMemo(
    () => resolveFormDefaults(catalogContent, resolvedContent),
    [catalogContent, resolvedContent],
  );
  const defaultsKey = useMemo(() => JSON.stringify(defaults), [defaults]);
  const [values, setValues] = useState(defaults);
  const [openSection, setOpenSection] = useState<SectionId | null>(null);

  useEffect(() => {
    setValues(defaults);
  }, [defaultsKey, defaults]);

  const setField = (name: string, value: string): void => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const sections: Array<{
    id: SectionId;
    title: string;
    description: string;
    preview: string;
    icon: ReactNode;
  }> = [
    {
      id: 'hero',
      title: 'Hero banner',
      description: 'Top banner image, eyebrow, accent line, and slogan.',
      preview: values.catalogSlogan || values.catalogEyebrow || 'Not set',
      icon: <ImageIcon size={20} aria-hidden />,
    },
    {
      id: 'about',
      title: 'About section',
      description: 'Intro text, paragraphs, and extra content block.',
      preview: values.catalogAboutTitle || values.catalogAboutLabel || 'Not set',
      icon: <BookOpen size={20} aria-hidden />,
    },
    {
      id: 'facts',
      title: 'Fact cards',
      description: 'Four highlight facts shown in the about area.',
      preview: values.catalogFact1Label || 'Not set',
      icon: <ListOrdered size={20} aria-hidden />,
    },
    {
      id: 'entries',
      title: 'Grid section labels',
      description: 'Titles above the monument card grid.',
      preview: values.catalogItemsTitle || values.catalogItemsLabel || 'Not set',
      icon: <LayoutGrid size={20} aria-hidden />,
    },
    {
      id: 'map',
      title: 'Map section',
      description: 'Heritage map block copy and placeholder.',
      preview: values.catalogMapTitle || values.catalogMapEyebrow || 'Not set',
      icon: <Map size={20} aria-hidden />,
    },
    {
      id: 'stats',
      title: 'Stat bar labels',
      description: 'Labels for the numbers bar under the hero.',
      preview: values.catalogStatEntries || 'Not set',
      icon: <BarChart3 size={20} aria-hidden />,
    },
  ];

  return (
    <>
      <HiddenCatalogFields values={values} />

      <div className="grid gap-3 sm:grid-cols-2">
        {sections.map((section) => (
          <AdminSectionCard
            key={section.id}
            title={section.title}
            description={section.description}
            preview={section.preview}
            icon={section.icon}
            onClick={() => setOpenSection(section.id)}
          />
        ))}
      </div>

      <AdminSheet
        open={openSection === 'hero'}
        onClose={() => setOpenSection(null)}
        eyebrow="Page layout"
        title="Hero banner"
        description="Large banner at the top of the culture catalog page."
        size="2xl"
      >
        <div className="flex flex-col gap-5">
          <PageContentImageField
            label="Hero banner image"
            layout="banner"
            value={values.catalogHeroImage ?? ''}
            onChange={(url) => setField('catalogHeroImage', url)}
            hint="Wide banner at the top of the catalog page (16:9)."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Hero eyebrow"
              value={values.catalogEyebrow ?? ''}
              onChange={(e) => setField('catalogEyebrow', e.target.value)}
              error={fieldErrors?.catalogEyebrow}
            />
            <TextField
              label="Hero accent"
              value={values.catalogAccent ?? ''}
              onChange={(e) => setField('catalogAccent', e.target.value)}
              error={fieldErrors?.catalogAccent}
            />
            <TextField
              label="Hero slogan"
              value={values.catalogSlogan ?? ''}
              onChange={(e) => setField('catalogSlogan', e.target.value)}
              error={fieldErrors?.catalogSlogan}
            />
          </div>
        </div>
      </AdminSheet>

      <AdminSheet
        open={openSection === 'about'}
        onClose={() => setOpenSection(null)}
        eyebrow="Page layout"
        title="About section"
        size="2xl"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="About label"
            value={values.catalogAboutLabel ?? ''}
            onChange={(e) => setField('catalogAboutLabel', e.target.value)}
          />
          <TextField
            label="About title"
            value={values.catalogAboutTitle ?? ''}
            onChange={(e) => setField('catalogAboutTitle', e.target.value)}
          />
          <div className="sm:col-span-2">
            <TextareaField
              label="About description"
              rows={3}
              value={values.catalogAboutDescription ?? ''}
              onChange={(e) => setField('catalogAboutDescription', e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <TextareaField
              label="About paragraphs"
              rows={5}
              value={values.catalogAboutParagraphs ?? ''}
              onChange={(e) => setField('catalogAboutParagraphs', e.target.value)}
              hint="Separate paragraphs with a blank line."
            />
          </div>
          <TextField
            label="Extra heading"
            value={values.catalogExtraHeading ?? ''}
            onChange={(e) => setField('catalogExtraHeading', e.target.value)}
          />
          <TextareaField
            label="Extra paragraph"
            rows={3}
            value={values.catalogExtraParagraph ?? ''}
            onChange={(e) => setField('catalogExtraParagraph', e.target.value)}
          />
        </div>
      </AdminSheet>

      <AdminSheet
        open={openSection === 'facts'}
        onClose={() => setOpenSection(null)}
        eyebrow="Page layout"
        title="Fact cards"
        size="2xl"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-stone-100 bg-parchment-50 p-4">
              <p className="text-xs font-medium uppercase tracking-eyebrow text-bronze-700">Fact {index}</p>
              <TextField
                label="Label"
                value={values[`catalogFact${index}Label`] ?? ''}
                onChange={(e) => setField(`catalogFact${index}Label`, e.target.value)}
              />
              <TextareaField
                label="Value"
                rows={2}
                value={values[`catalogFact${index}Value`] ?? ''}
                onChange={(e) => setField(`catalogFact${index}Value`, e.target.value)}
              />
            </div>
          ))}
        </div>
      </AdminSheet>

      <AdminSheet
        open={openSection === 'entries'}
        onClose={() => setOpenSection(null)}
        eyebrow="Page layout"
        title="Grid section labels"
        size="2xl"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Section label"
            value={values.catalogItemsLabel ?? ''}
            onChange={(e) => setField('catalogItemsLabel', e.target.value)}
          />
          <TextField
            label="Section title"
            value={values.catalogItemsTitle ?? ''}
            onChange={(e) => setField('catalogItemsTitle', e.target.value)}
          />
          <div className="sm:col-span-2">
            <TextareaField
              label="Section description"
              rows={3}
              value={values.catalogItemsDescription ?? ''}
              onChange={(e) => setField('catalogItemsDescription', e.target.value)}
            />
          </div>
          <TextField
            label="Submit prompt"
            value={values.catalogSubmitPrompt ?? ''}
            onChange={(e) => setField('catalogSubmitPrompt', e.target.value)}
          />
          <TextField
            label="Empty state message"
            value={values.catalogEmptyMessage ?? ''}
            onChange={(e) => setField('catalogEmptyMessage', e.target.value)}
          />
        </div>
      </AdminSheet>

      <AdminSheet
        open={openSection === 'map'}
        onClose={() => setOpenSection(null)}
        eyebrow="Page layout"
        title="Map section"
        size="2xl"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Map eyebrow"
            value={values.catalogMapEyebrow ?? ''}
            onChange={(e) => setField('catalogMapEyebrow', e.target.value)}
          />
          <TextField
            label="Map title"
            value={values.catalogMapTitle ?? ''}
            onChange={(e) => setField('catalogMapTitle', e.target.value)}
          />
          <div className="sm:col-span-2">
            <TextareaField
              label="Map description"
              rows={3}
              value={values.catalogMapDescription ?? ''}
              onChange={(e) => setField('catalogMapDescription', e.target.value)}
            />
          </div>
          <TextField
            label="Map placeholder title"
            value={values.catalogMapPlaceholder ?? ''}
            onChange={(e) => setField('catalogMapPlaceholder', e.target.value)}
          />
        </div>
      </AdminSheet>

      <AdminSheet
        open={openSection === 'stats'}
        onClose={() => setOpenSection(null)}
        eyebrow="Page layout"
        title="Stat bar labels"
        size="2xl"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Entries label"
            value={values.catalogStatEntries ?? ''}
            onChange={(e) => setField('catalogStatEntries', e.target.value)}
          />
          <TextField
            label="Regions label"
            value={values.catalogStatRegions ?? ''}
            onChange={(e) => setField('catalogStatRegions', e.target.value)}
          />
          <TextField
            label="Third stat label"
            value={values.catalogStatThird ?? ''}
            onChange={(e) => setField('catalogStatThird', e.target.value)}
          />
          <TextField
            label="Fourth stat label"
            value={values.catalogStatFourth ?? ''}
            onChange={(e) => setField('catalogStatFourth', e.target.value)}
          />
        </div>
      </AdminSheet>
    </>
  );
}
