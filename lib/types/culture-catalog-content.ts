import { z } from 'zod';
import type { CultureCatalogContent, CultureCatalogFact } from '@/lib/constants/culture-catalog-content';

const factSchema = z.object({
  label: z.string().trim().min(1).max(120),
  value: z.string().trim().min(1).max(600),
});

export const menuCatalogContentSchema = z
  .object({
    eyebrow: z.string().trim().max(200).optional(),
    accent: z.string().trim().max(200).optional(),
    slogan: z.string().trim().max(300).optional(),
    heroImage: z.string().trim().max(500).optional(),
    about: z
      .object({
        label: z.string().trim().max(120).optional(),
        title: z.string().trim().max(200).optional(),
        description: z.string().trim().max(2000).optional(),
        paragraphs: z.array(z.string().trim().max(2000)).max(6).optional(),
        extraHeading: z.string().trim().max(200).optional(),
        extraParagraph: z.string().trim().max(2000).optional(),
        facts: z.array(factSchema).max(6).optional(),
      })
      .optional(),
    items: z
      .object({
        label: z.string().trim().max(120).optional(),
        title: z.string().trim().max(200).optional(),
        description: z.string().trim().max(2000).optional(),
        submitPrompt: z.string().trim().max(300).optional(),
        emptyMessage: z.string().trim().max(300).optional(),
      })
      .optional(),
    map: z
      .object({
        eyebrow: z.string().trim().max(120).optional(),
        title: z.string().trim().max(200).optional(),
        description: z.string().trim().max(2000).optional(),
        placeholderTitle: z.string().trim().max(200).optional(),
      })
      .optional(),
    statLabels: z
      .object({
        entries: z.string().trim().max(80).optional(),
        regions: z.string().trim().max(80).optional(),
        third: z.string().trim().max(80).optional(),
        fourth: z.string().trim().max(80).optional(),
      })
      .optional(),
    sectionVisibility: z
      .object({
        hero: z.boolean().optional(),
        about: z.boolean().optional(),
        facts: z.boolean().optional(),
        entries: z.boolean().optional(),
        map: z.boolean().optional(),
        stats: z.boolean().optional(),
      })
      .optional(),
  })
  .strict();

export type MenuCatalogContentOverride = z.infer<typeof menuCatalogContentSchema>;

export function parseMenuCatalogContent(value: unknown): MenuCatalogContentOverride | null {
  if (value === null || value === undefined) return null;
  const parsed = menuCatalogContentSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function mergeCultureCatalogLayers(
  base: CultureCatalogContent,
  ...overrides: Array<Partial<CultureCatalogContent> | MenuCatalogContentOverride | null | undefined>
): CultureCatalogContent {
  let result = base;
  for (const override of overrides) {
    if (!override) continue;
    result = {
      ...result,
      ...override,
      sectionVisibility: {
        ...result.sectionVisibility,
        ...override.sectionVisibility,
      },
      about: {
        ...result.about,
        ...override.about,
        paragraphs: override.about?.paragraphs ?? result.about.paragraphs,
        facts: (override.about?.facts as CultureCatalogFact[] | undefined) ?? result.about.facts,
      },
      items: { ...result.items, ...override.items },
      map: { ...result.map, ...override.map },
      statLabels: { ...result.statLabels, ...override.statLabels },
    };
  }
  return result;
}

export function isMenuCatalogContentEmpty(value: MenuCatalogContentOverride | null): boolean {
  if (!value) return true;
  return JSON.stringify(value) === '{}';
}

function optionalTrim(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed || undefined;
}

function optionalBoolean(value: string): boolean | undefined {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return normalized === '1' || normalized === 'true' || normalized === 'on' || normalized === 'yes';
}

export function catalogContentFromFormFields(formData: FormData): MenuCatalogContentOverride | null {
  const read = (name: string): string => formData.get(name)?.toString() ?? '';

  const paragraphsRaw = read('catalogAboutParagraphs');
  const paragraphs = paragraphsRaw
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const facts: CultureCatalogFact[] = [];
  for (let i = 1; i <= 4; i += 1) {
    const label = read(`catalogFact${i}Label`).trim();
    const value = read(`catalogFact${i}Value`).trim();
    if (label && value) facts.push({ label, value });
  }

  const draft: MenuCatalogContentOverride = {
    eyebrow: optionalTrim(read('catalogEyebrow')),
    accent: optionalTrim(read('catalogAccent')),
    slogan: optionalTrim(read('catalogSlogan')),
    heroImage: optionalTrim(read('catalogHeroImage')),
    about: {
      label: optionalTrim(read('catalogAboutLabel')),
      title: optionalTrim(read('catalogAboutTitle')),
      description: optionalTrim(read('catalogAboutDescription')),
      paragraphs: paragraphs.length > 0 ? paragraphs : undefined,
      extraHeading: optionalTrim(read('catalogExtraHeading')),
      extraParagraph: optionalTrim(read('catalogExtraParagraph')),
      facts: facts.length > 0 ? facts : undefined,
    },
    items: {
      label: optionalTrim(read('catalogItemsLabel')),
      title: optionalTrim(read('catalogItemsTitle')),
      description: optionalTrim(read('catalogItemsDescription')),
      submitPrompt: optionalTrim(read('catalogSubmitPrompt')),
      emptyMessage: optionalTrim(read('catalogEmptyMessage')),
    },
    map: {
      eyebrow: optionalTrim(read('catalogMapEyebrow')),
      title: optionalTrim(read('catalogMapTitle')),
      description: optionalTrim(read('catalogMapDescription')),
      placeholderTitle: optionalTrim(read('catalogMapPlaceholder')),
    },
    statLabels: {
      entries: optionalTrim(read('catalogStatEntries')),
      regions: optionalTrim(read('catalogStatRegions')),
      third: optionalTrim(read('catalogStatThird')),
      fourth: optionalTrim(read('catalogStatFourth')),
    },
    sectionVisibility: {
      hero: optionalBoolean(read('catalogSectionHero')),
      about: optionalBoolean(read('catalogSectionAbout')),
      facts: optionalBoolean(read('catalogSectionFacts')),
      entries: optionalBoolean(read('catalogSectionEntries')),
      map: optionalBoolean(read('catalogSectionMap')),
      stats: optionalBoolean(read('catalogSectionStats')),
    },
  };

  const parsed = menuCatalogContentSchema.safeParse(draft);
  if (!parsed.success || isMenuCatalogContentEmpty(parsed.data)) return null;
  return parsed.data;
}

export function cultureCatalogContentToOverride(
  content: CultureCatalogContent,
): MenuCatalogContentOverride {
  return {
    eyebrow: content.eyebrow,
    accent: content.accent,
    slogan: content.slogan,
    heroImage: content.heroImage,
    sectionVisibility: { ...content.sectionVisibility },
    about: {
      label: content.about.label,
      title: content.about.title,
      description: content.about.description,
      paragraphs: [...content.about.paragraphs],
      extraHeading: content.about.extraHeading,
      extraParagraph: content.about.extraParagraph,
      facts: content.about.facts.map((fact) => ({ ...fact })),
    },
    items: { ...content.items },
    map: { ...content.map },
    statLabels: { ...content.statLabels },
  };
}

export function menuCatalogContentToFormDefaults(
  content: MenuCatalogContentOverride | null,
): Record<string, string> {
  if (!content) return {};
  const facts = content.about?.facts ?? [];
  return {
    catalogHeroImage: content.heroImage ?? '',
    catalogEyebrow: content.eyebrow ?? '',
    catalogAccent: content.accent ?? '',
    catalogSlogan: content.slogan ?? '',
    catalogAboutLabel: content.about?.label ?? '',
    catalogAboutTitle: content.about?.title ?? '',
    catalogAboutDescription: content.about?.description ?? '',
    catalogAboutParagraphs: content.about?.paragraphs?.join('\n\n') ?? '',
    catalogExtraHeading: content.about?.extraHeading ?? '',
    catalogExtraParagraph: content.about?.extraParagraph ?? '',
    catalogItemsLabel: content.items?.label ?? '',
    catalogItemsTitle: content.items?.title ?? '',
    catalogItemsDescription: content.items?.description ?? '',
    catalogSubmitPrompt: content.items?.submitPrompt ?? '',
    catalogEmptyMessage: content.items?.emptyMessage ?? '',
    catalogMapEyebrow: content.map?.eyebrow ?? '',
    catalogMapTitle: content.map?.title ?? '',
    catalogMapDescription: content.map?.description ?? '',
    catalogMapPlaceholder: content.map?.placeholderTitle ?? '',
    catalogStatEntries: content.statLabels?.entries ?? '',
    catalogStatRegions: content.statLabels?.regions ?? '',
    catalogStatThird: content.statLabels?.third ?? '',
    catalogStatFourth: content.statLabels?.fourth ?? '',
    catalogSectionHero: content.sectionVisibility?.hero === false ? '0' : '1',
    catalogSectionAbout: content.sectionVisibility?.about === false ? '0' : '1',
    catalogSectionFacts: content.sectionVisibility?.facts === false ? '0' : '1',
    catalogSectionEntries: content.sectionVisibility?.entries === false ? '0' : '1',
    catalogSectionMap: content.sectionVisibility?.map === false ? '0' : '1',
    catalogSectionStats: content.sectionVisibility?.stats === false ? '0' : '1',
    catalogFact1Label: facts[0]?.label ?? '',
    catalogFact1Value: facts[0]?.value ?? '',
    catalogFact2Label: facts[1]?.label ?? '',
    catalogFact2Value: facts[1]?.value ?? '',
    catalogFact3Label: facts[2]?.label ?? '',
    catalogFact3Value: facts[2]?.value ?? '',
    catalogFact4Label: facts[3]?.label ?? '',
    catalogFact4Value: facts[3]?.value ?? '',
  };
}
