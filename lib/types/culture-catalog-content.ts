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

export function catalogContentFromFormFields(formData: FormData): MenuCatalogContentOverride | null {
  const read = (name: string): string => formData.get(name)?.toString().trim() ?? '';

  const heroImage = read('catalogHeroImage');
  const eyebrow = read('catalogEyebrow');
  const accent = read('catalogAccent');
  const slogan = read('catalogSlogan');

  const aboutLabel = read('catalogAboutLabel');
  const aboutTitle = read('catalogAboutTitle');
  const aboutDescription = read('catalogAboutDescription');
  const paragraphsRaw = read('catalogAboutParagraphs');
  const paragraphs = paragraphsRaw
    ? paragraphsRaw.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
    : [];

  const extraHeading = read('catalogExtraHeading');
  const extraParagraph = read('catalogExtraParagraph');

  const facts: CultureCatalogFact[] = [];
  for (let i = 1; i <= 4; i += 1) {
    const label = read(`catalogFact${i}Label`);
    const value = read(`catalogFact${i}Value`);
    if (label && value) facts.push({ label, value });
  }

  const itemsLabel = read('catalogItemsLabel');
  const itemsTitle = read('catalogItemsTitle');
  const itemsDescription = read('catalogItemsDescription');
  const submitPrompt = read('catalogSubmitPrompt');
  const emptyMessage = read('catalogEmptyMessage');

  const mapEyebrow = read('catalogMapEyebrow');
  const mapTitle = read('catalogMapTitle');
  const mapDescription = read('catalogMapDescription');
  const mapPlaceholder = read('catalogMapPlaceholder');

  const statEntries = read('catalogStatEntries');
  const statRegions = read('catalogStatRegions');
  const statThird = read('catalogStatThird');
  const statFourth = read('catalogStatFourth');

  const draft: MenuCatalogContentOverride = {
    ...(eyebrow ? { eyebrow } : {}),
    ...(accent ? { accent } : {}),
    ...(slogan ? { slogan } : {}),
    ...(heroImage ? { heroImage } : {}),
    about: {
      ...(aboutLabel ? { label: aboutLabel } : {}),
      ...(aboutTitle ? { title: aboutTitle } : {}),
      ...(aboutDescription ? { description: aboutDescription } : {}),
      ...(paragraphs.length > 0 ? { paragraphs } : {}),
      ...(extraHeading ? { extraHeading } : {}),
      ...(extraParagraph ? { extraParagraph } : {}),
      ...(facts.length > 0 ? { facts } : {}),
    },
    items: {
      ...(itemsLabel ? { label: itemsLabel } : {}),
      ...(itemsTitle ? { title: itemsTitle } : {}),
      ...(itemsDescription ? { description: itemsDescription } : {}),
      ...(submitPrompt ? { submitPrompt } : {}),
      ...(emptyMessage ? { emptyMessage } : {}),
    },
    map: {
      ...(mapEyebrow ? { eyebrow: mapEyebrow } : {}),
      ...(mapTitle ? { title: mapTitle } : {}),
      ...(mapDescription ? { description: mapDescription } : {}),
      ...(mapPlaceholder ? { placeholderTitle: mapPlaceholder } : {}),
    },
    statLabels: {
      ...(statEntries ? { entries: statEntries } : {}),
      ...(statRegions ? { regions: statRegions } : {}),
      ...(statThird ? { third: statThird } : {}),
      ...(statFourth ? { fourth: statFourth } : {}),
    },
  };

  const cleaned: MenuCatalogContentOverride = {
    ...draft,
    about: draft.about && Object.keys(draft.about).length > 0 ? draft.about : undefined,
    items: draft.items && Object.keys(draft.items).length > 0 ? draft.items : undefined,
    map: draft.map && Object.keys(draft.map).length > 0 ? draft.map : undefined,
    statLabels:
      draft.statLabels && Object.keys(draft.statLabels).length > 0 ? draft.statLabels : undefined,
  };

  const parsed = menuCatalogContentSchema.safeParse(cleaned);
  if (!parsed.success || isMenuCatalogContentEmpty(parsed.data)) return null;
  return parsed.data;
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
