'use client';

import { useActionState, useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { TextField } from '@/components/forms/fields/TextField';
import { ImageDropzoneField } from '@/components/forms/fields/ImageDropzoneField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { AdminFormTabs } from '@/components/admin/AdminFormTabs';
import { TranslatableFieldsTabs } from '@/components/admin/TranslatableFieldsTabs';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { AdminStickySaveBar } from '@/components/admin/AdminStickySaveBar';
import { HomeStatsEditor } from '@/components/admin/HomeStatsEditor';
import { HomeTechCardsEditor } from '@/components/admin/HomeTechCardsEditor';
import { HomeSectionsEditor } from '@/components/admin/HomeSectionsEditor';
import {
  saveHomeContentAction,
  type HomeContentFormState,
} from '@/app/(admin)/admin/(panel)/home-content/actions';
import {
  getSectionFieldError,
  validateHomeStatsClient,
  validateHomeTechCardsClient,
  type HomeStat,
  type HomeTechCard,
} from '@/lib/types/home-content';
import { homeSectionsSchema, type HomeSections } from '@/lib/types/home-sections';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const INITIAL: HomeContentFormState = { status: 'idle' };

const TABS = [
  { id: 'hero', label: 'Hero', hint: 'Banner & buttons' },
  { id: 'stats', label: 'Stats & mission', hint: 'Numbers & intro' },
  { id: 'tech', label: 'Technology', hint: 'Feature cards' },
  { id: 'sections', label: 'Homepage blocks', hint: 'All section copy' },
  { id: 'cta', label: 'Final CTA', hint: 'Bottom call-to-action' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export interface HomeContentFormInitial {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroTagline: string;
  heroDescription: string;
  heroImage: string;
  heroMobileImage: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  stats: HomeStat[];
  missionTitle: string;
  missionHighlight: string;
  missionText: string;
  techCards: HomeTechCard[];
  ctaTitle: string;
  ctaDescription: string;
  sections: HomeSections;
}

interface Props {
  initial: HomeContentFormInitial;
}

export function HomeContentForm({ initial }: Props) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(saveHomeContentAction, INITIAL);
  const [activeTab, setActiveTab] = useState<TabId>('hero');
  const [stats, setStats] = useState<HomeStat[]>(initial.stats);
  const [techCards, setTechCards] = useState<HomeTechCard[]>(initial.techCards);
  const [sections, setSections] = useState<HomeSections>(initial.sections);
  const [clientStatsError, setClientStatsError] = useState<string | undefined>();
  const [clientTechError, setClientTechError] = useState<string | undefined>();
  const [clientSectionsError, setClientSectionsError] = useState<string | undefined>();

  useEffect(() => {
    if (state.status === 'success') {
      router.refresh();
    }
  }, [state.status, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const statsError = validateHomeStatsClient(stats);
    const techError = validateHomeTechCardsClient(techCards);
    const sectionsResult = homeSectionsSchema.safeParse(sections);

    if (statsError || techError || !sectionsResult.success) {
      event.preventDefault();
      setClientStatsError(statsError);
      setClientTechError(techError);
      setClientSectionsError(
        sectionsResult.success ? undefined : 'Please review the homepage section fields.',
      );
      if (!sectionsResult.success) setActiveTab('sections');
      else if (statsError) setActiveTab('stats');
      else if (techError) setActiveTab('tech');
      return;
    }

    setClientStatsError(undefined);
    setClientTechError(undefined);
    setClientSectionsError(undefined);
  };

  const statsSectionError =
    clientStatsError ?? getSectionFieldError(state.fieldErrors, 'stats');
  const techSectionError =
    clientTechError ?? getSectionFieldError(state.fieldErrors, 'techCards');
  const sectionsSectionError =
    clientSectionsError ?? getSectionFieldError(state.fieldErrors, 'sections');
  const localeTabErrors = buildTabErrorMap(state.fieldErrors);
  const valueFor = (values: LocaleTextMap, locale: SiteLocaleCode): string => values[locale] ?? '';
  const heroBadgeValues = decodeTranslatableText(initial.heroBadge);
  const heroTitleValues = decodeTranslatableText(initial.heroTitle);
  const heroHighlightValues = decodeTranslatableText(initial.heroHighlight);
  const heroSubtitleValues = decodeTranslatableText(initial.heroSubtitle);
  const heroTaglineValues = decodeTranslatableText(initial.heroTagline);
  const heroDescriptionValues = decodeTranslatableText(initial.heroDescription);
  const primaryCtaTextValues = decodeTranslatableText(initial.primaryCtaText);
  const secondaryCtaTextValues = decodeTranslatableText(initial.secondaryCtaText);
  const missionTitleValues = decodeTranslatableText(initial.missionTitle);
  const missionHighlightValues = decodeTranslatableText(initial.missionHighlight);
  const missionTextValues = decodeTranslatableText(initial.missionText);
  const ctaTitleValues = decodeTranslatableText(initial.ctaTitle);
  const ctaDescriptionValues = decodeTranslatableText(initial.ctaDescription);

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="statsJson" value={JSON.stringify(stats)} readOnly />
      <input type="hidden" name="techCardsJson" value={JSON.stringify(techCards)} readOnly />
      <input type="hidden" name="sectionsJson" value={JSON.stringify(sections)} readOnly />

      <AdminHelpCallout title="How this page works">
        Use the tabs below to edit each part of the homepage. Upload images where provided, then save once
        at the bottom — all tabs are saved together.
      </AdminHelpCallout>

      <AdminFormTabs tabs={[...TABS]} activeId={activeTab} onChange={(id) => setActiveTab(id as TabId)} />

      <TranslatableFieldsTabs tabErrors={localeTabErrors}>
        {(locale) => (
          <>
      {activeTab === 'hero' ? (
        <AdminFormSection
          title="Hero banner"
          description="The large banner visitors see first — title, images, and main action buttons."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Small label above title"
              name={`heroBadge.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(heroBadgeValues, locale)}
              error={state.fieldErrors?.[`heroBadge.${locale}`]}
            />
            <TextField
              label="Main title"
              name={`heroTitle.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(heroTitleValues, locale)}
              error={state.fieldErrors?.[`heroTitle.${locale}`]}
            />
            <TextField
              label="Highlighted word in title"
              name={`heroHighlight.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(heroHighlightValues, locale)}
              error={state.fieldErrors?.[`heroHighlight.${locale}`]}
            />
            <TextField
              label="Subtitle"
              name={`heroSubtitle.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(heroSubtitleValues, locale)}
              hint="Use a new line for a second subtitle line."
              error={state.fieldErrors?.[`heroSubtitle.${locale}`]}
            />
            <TextField
              label="Tagline"
              name={`heroTagline.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(heroTaglineValues, locale)}
              error={state.fieldErrors?.[`heroTagline.${locale}`]}
            />
            <TextField
              label="Primary button text"
              name={`primaryCtaText.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(primaryCtaTextValues, locale)}
              error={state.fieldErrors?.[`primaryCtaText.${locale}`]}
            />
            <TextField
              label="Primary button link"
              name="primaryCtaUrl"
              required
              defaultValue={initial.primaryCtaUrl}
              error={state.fieldErrors?.primaryCtaUrl}
            />
            <TextField
              label="Secondary button text"
              name={`secondaryCtaText.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(secondaryCtaTextValues, locale)}
              error={state.fieldErrors?.[`secondaryCtaText.${locale}`]}
            />
            <TextField
              label="Secondary button link"
              name="secondaryCtaUrl"
              required
              defaultValue={initial.secondaryCtaUrl}
              error={state.fieldErrors?.secondaryCtaUrl}
            />
            <ImageDropzoneField
              label="Desktop hero image"
              name="heroImage"
              variant="desktop"
              defaultValue={initial.heroImage}
              error={state.fieldErrors?.heroImage}
              hint="Optional. Leave empty to show the default dark heritage background without a photo."
            />
            <ImageDropzoneField
              label="Mobile hero image"
              name="heroMobileImage"
              variant="mobile"
              defaultValue={initial.heroMobileImage}
              error={state.fieldErrors?.heroMobileImage}
            />
          </div>
          <TextareaField
            label="Hero description"
            name={`heroDescription.${locale}`}
            rows={3}
            required={locale === 'EN'}
            defaultValue={valueFor(heroDescriptionValues, locale)}
            error={state.fieldErrors?.[`heroDescription.${locale}`]}
          />
        </AdminFormSection>
      ) : null}

      {activeTab === 'stats' ? (
        <>
          <AdminFormSection title="Hero statistics" description="Number counters shown below the hero banner.">
            <HomeStatsEditor
              stats={stats}
              onChange={setStats}
              sectionError={statsSectionError}
              fieldErrors={state.fieldErrors}
            />
          </AdminFormSection>
          <AdminFormSection title="Mission preview" description="Short mission statement block on the homepage.">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Mission title"
                name={`missionTitle.${locale}`}
                required={locale === 'EN'}
                defaultValue={valueFor(missionTitleValues, locale)}
                error={state.fieldErrors?.[`missionTitle.${locale}`]}
              />
              <TextField
                label="Mission highlight"
                name={`missionHighlight.${locale}`}
                required={locale === 'EN'}
                defaultValue={valueFor(missionHighlightValues, locale)}
                error={state.fieldErrors?.[`missionHighlight.${locale}`]}
              />
            </div>
            <TextareaField
              label="Mission text"
              name={`missionText.${locale}`}
              rows={4}
              required={locale === 'EN'}
              defaultValue={valueFor(missionTextValues, locale)}
              error={state.fieldErrors?.[`missionText.${locale}`]}
            />
          </AdminFormSection>
        </>
      ) : null}

      {activeTab === 'tech' ? (
        <AdminFormSection
          title="Technology cards"
          description="Highlight cards for digital preservation tools and experiences."
        >
          <HomeTechCardsEditor
            techCards={techCards}
            onChange={setTechCards}
            sectionError={techSectionError}
            fieldErrors={state.fieldErrors}
          />
        </AdminFormSection>
      ) : null}

      {activeTab === 'sections' ? (
        <HomeSectionsEditor
          sections={sections}
          onChange={setSections}
          sectionError={sectionsSectionError}
        />
      ) : null}

      {activeTab === 'cta' ? (
        <AdminFormSection title="Final call-to-action" description="Banner at the bottom of the homepage.">
          <TextField
            label="CTA title"
            name={`ctaTitle.${locale}`}
            required={locale === 'EN'}
            defaultValue={valueFor(ctaTitleValues, locale)}
            error={state.fieldErrors?.[`ctaTitle.${locale}`]}
          />
          <TextareaField
            label="CTA description"
            name={`ctaDescription.${locale}`}
            rows={3}
            required={locale === 'EN'}
            defaultValue={valueFor(ctaDescriptionValues, locale)}
            error={state.fieldErrors?.[`ctaDescription.${locale}`]}
          />
        </AdminFormSection>
      ) : null}
          </>
        )}
      </TranslatableFieldsTabs>

      <AdminStickySaveBar
        label="Save homepage"
        isPending={isPending}
        successMessage={state.status === 'success' ? state.message : undefined}
        errorMessage={state.status === 'error' ? state.message : undefined}
      />
    </form>
  );
}
