import type { Prisma } from '@prisma/client';
import { encodeLocaleDocument, decodeLocaleDocument } from '@/lib/i18n/locale-document';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import { encodeTranslatableText, readLocalizedTextFromFormData, type LocaleTextMap } from '@/lib/i18n/translatable-content';
import {
  menuCatalogContentSchema,
  parseMenuCatalogContent,
  type MenuCatalogContentOverride,
} from '@/lib/types/culture-catalog-content';

export const CATALOG_SECTION_IDS = ['hero', 'about', 'facts', 'entries', 'map', 'stats'] as const;
export type CatalogSectionId = (typeof CATALOG_SECTION_IDS)[number];

export function isCatalogSectionId(value: string): value is CatalogSectionId {
  return (CATALOG_SECTION_IDS as readonly string[]).includes(value);
}

export function decodeCatalogDocuments(
  raw: unknown,
): Partial<Record<SiteLocaleCode, MenuCatalogContentOverride>> {
  return decodeLocaleDocument(raw, (value) => parseMenuCatalogContent(value) ?? {});
}

function trim(value: string | undefined): string | undefined {
  const next = value?.trim() ?? '';
  return next || undefined;
}

function sectionPatch(
  section: CatalogSectionId,
  locale: SiteLocaleCode,
  formData: FormData,
  shared: { heroImage?: string; enabled: boolean },
): MenuCatalogContentOverride {
  const text = (name: string): string | undefined =>
    trim(readLocalizedTextFromFormData(formData, name)[locale]);
  if (section === 'hero') {
    return {
      eyebrow: text('catalogEyebrow'),
      accent: text('catalogAccent'),
      slogan: text('catalogSlogan'),
      heroImage: shared.heroImage,
      sectionVisibility: { hero: shared.enabled },
    };
  }
  if (section === 'about') {
    const paragraphs = (text('catalogAboutParagraphs') ?? '')
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    return {
      about: {
        label: text('catalogAboutLabel'),
        title: text('catalogAboutTitle'),
        description: text('catalogAboutDescription'),
        paragraphs: paragraphs.length > 0 ? paragraphs : undefined,
        extraHeading: text('catalogExtraHeading'),
        extraParagraph: text('catalogExtraParagraph'),
      },
      sectionVisibility: { about: shared.enabled },
    };
  }
  if (section === 'facts') {
    const facts = [1, 2, 3, 4].flatMap((index) => {
      const label = text(`catalogFact${index}Label`);
      const value = text(`catalogFact${index}Value`);
      return label && value ? [{ label, value }] : [];
    });
    return { about: { facts: facts.length > 0 ? facts : undefined }, sectionVisibility: { facts: shared.enabled } };
  }
  if (section === 'entries') {
    return {
      items: {
        label: text('catalogItemsLabel'),
        title: text('catalogItemsTitle'),
        description: text('catalogItemsDescription'),
        submitPrompt: text('catalogSubmitPrompt'),
        emptyMessage: text('catalogEmptyMessage'),
      },
      sectionVisibility: { entries: shared.enabled },
    };
  }
  if (section === 'map') {
    return {
      map: {
        eyebrow: text('catalogMapEyebrow'),
        title: text('catalogMapTitle'),
        description: text('catalogMapDescription'),
        placeholderTitle: text('catalogMapPlaceholder'),
      },
      sectionVisibility: { map: shared.enabled },
    };
  }
  return {
    statLabels: {
      entries: text('catalogStatEntries'),
      regions: text('catalogStatRegions'),
      third: text('catalogStatThird'),
      fourth: text('catalogStatFourth'),
    },
    sectionVisibility: { stats: shared.enabled },
  };
}

function mergeSection(
  current: MenuCatalogContentOverride | undefined,
  patch: MenuCatalogContentOverride,
): MenuCatalogContentOverride {
  const parsed = menuCatalogContentSchema.safeParse({
    ...current,
    ...patch,
    about: { ...current?.about, ...patch.about },
    items: { ...current?.items, ...patch.items },
    map: { ...current?.map, ...patch.map },
    statLabels: { ...current?.statLabels, ...patch.statLabels },
    sectionVisibility: { ...current?.sectionVisibility, ...patch.sectionVisibility },
  });
  return parsed.success ? parsed.data : (current ?? {});
}

function encodeField(read: (doc: MenuCatalogContentOverride | undefined) => string | undefined, docs: Partial<Record<SiteLocaleCode, MenuCatalogContentOverride>>): string {
  const map: LocaleTextMap = {};
  for (const locale of SITE_LOCALE_CODES) map[locale] = read(docs[locale]) ?? '';
  return encodeTranslatableText(map);
}

export function catalogSectionEncodedFields(
  raw: unknown,
  section: CatalogSectionId,
): Record<string, string> {
  const docs = decodeCatalogDocuments(raw);
  const shared = docs.EN;
  const enabled = shared?.sectionVisibility?.[section] !== false;
  const text = (name: string, read: (doc: MenuCatalogContentOverride | undefined) => string | undefined): [string, string] => [
    name,
    encodeField(read, docs),
  ];
  const pairs: Array<[string, string]> = [['catalogSectionEnabled', enabled ? 'on' : '']];
  if (section === 'hero') {
    pairs.push(
      text('catalogEyebrow', (doc) => doc?.eyebrow),
      text('catalogAccent', (doc) => doc?.accent),
      text('catalogSlogan', (doc) => doc?.slogan),
      ['catalogHeroImage', shared?.heroImage ?? ''],
    );
  } else if (section === 'about') {
    pairs.push(
      text('catalogAboutLabel', (doc) => doc?.about?.label),
      text('catalogAboutTitle', (doc) => doc?.about?.title),
      text('catalogAboutDescription', (doc) => doc?.about?.description),
      text('catalogAboutParagraphs', (doc) => doc?.about?.paragraphs?.join('\n\n')),
      text('catalogExtraHeading', (doc) => doc?.about?.extraHeading),
      text('catalogExtraParagraph', (doc) => doc?.about?.extraParagraph),
    );
  } else if (section === 'facts') {
    for (let index = 1; index <= 4; index += 1) {
      pairs.push(
        text(`catalogFact${index}Label`, (doc) => doc?.about?.facts?.[index - 1]?.label),
        text(`catalogFact${index}Value`, (doc) => doc?.about?.facts?.[index - 1]?.value),
      );
    }
  } else if (section === 'entries') {
    pairs.push(
      text('catalogItemsLabel', (doc) => doc?.items?.label),
      text('catalogItemsTitle', (doc) => doc?.items?.title),
      text('catalogItemsDescription', (doc) => doc?.items?.description),
      text('catalogSubmitPrompt', (doc) => doc?.items?.submitPrompt),
      text('catalogEmptyMessage', (doc) => doc?.items?.emptyMessage),
    );
  } else if (section === 'map') {
    pairs.push(
      text('catalogMapEyebrow', (doc) => doc?.map?.eyebrow),
      text('catalogMapTitle', (doc) => doc?.map?.title),
      text('catalogMapDescription', (doc) => doc?.map?.description),
      text('catalogMapPlaceholder', (doc) => doc?.map?.placeholderTitle),
    );
  } else {
    pairs.push(
      text('catalogStatEntries', (doc) => doc?.statLabels?.entries),
      text('catalogStatRegions', (doc) => doc?.statLabels?.regions),
      text('catalogStatThird', (doc) => doc?.statLabels?.third),
      text('catalogStatFourth', (doc) => doc?.statLabels?.fourth),
    );
  }
  return Object.fromEntries(pairs);
}

export function catalogDocumentFromSection(
  existing: unknown,
  section: CatalogSectionId,
  formData: FormData,
): Prisma.InputJsonValue {
  const docs = decodeCatalogDocuments(existing);
  const heroImage = trim(formData.get('catalogHeroImage')?.toString());
  const enabled = formData.get('catalogSectionEnabled') === 'on';
  for (const locale of SITE_LOCALE_CODES) {
    docs[locale] = mergeSection(docs[locale], sectionPatch(section, locale, formData, { heroImage, enabled }));
  }
  return encodeLocaleDocument(docs) as unknown as Prisma.InputJsonValue;
}
