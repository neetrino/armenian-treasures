'use client';

import { useActionState, useState, type FormEvent } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { ImageDropzoneField } from '@/components/forms/fields/ImageDropzoneField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { HomeStatsEditor } from '@/components/admin/HomeStatsEditor';
import { HomeTechCardsEditor } from '@/components/admin/HomeTechCardsEditor';
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
import type { HomeSections } from '@/lib/types/home-sections';

const INITIAL: HomeContentFormState = { status: 'idle' };

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
  const [state, formAction, isPending] = useActionState(saveHomeContentAction, INITIAL);
  const [stats, setStats] = useState<HomeStat[]>(initial.stats);
  const [techCards, setTechCards] = useState<HomeTechCard[]>(initial.techCards);
  const [sectionsJson, setSectionsJson] = useState(JSON.stringify(initial.sections, null, 2));
  const [clientStatsError, setClientStatsError] = useState<string | undefined>();
  const [clientTechError, setClientTechError] = useState<string | undefined>();
  const [clientSectionsError, setClientSectionsError] = useState<string | undefined>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const statsError = validateHomeStatsClient(stats);
    const techError = validateHomeTechCardsClient(techCards);
    if (statsError || techError) {
      event.preventDefault();
      setClientStatsError(statsError);
      setClientTechError(techError);
      return;
    }

    try {
      JSON.parse(sectionsJson);
      setClientSectionsError(undefined);
    } catch {
      event.preventDefault();
      setClientSectionsError('Home sections JSON is invalid.');
      return;
    }

    setClientStatsError(undefined);
    setClientTechError(undefined);
  };

  const statsSectionError =
    clientStatsError ?? getSectionFieldError(state.fieldErrors, 'stats');
  const techSectionError =
    clientTechError ?? getSectionFieldError(state.fieldErrors, 'techCards');
  const sectionsSectionError =
    clientSectionsError ?? getSectionFieldError(state.fieldErrors, 'sections');

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="statsJson" value={JSON.stringify(stats)} readOnly />
      <input type="hidden" name="techCardsJson" value={JSON.stringify(techCards)} readOnly />
      <input type="hidden" name="sectionsJson" value={sectionsJson} readOnly />

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Hero</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Hero badge"
            name="heroBadge"
            required
            defaultValue={initial.heroBadge}
            error={state.fieldErrors?.heroBadge}
          />
          <TextField
            label="Hero title"
            name="heroTitle"
            required
            defaultValue={initial.heroTitle}
            error={state.fieldErrors?.heroTitle}
          />
          <TextField
            label="Hero highlighted title"
            name="heroHighlight"
            required
            defaultValue={initial.heroHighlight}
            error={state.fieldErrors?.heroHighlight}
          />
          <TextField
            label="Hero subtitle"
            name="heroSubtitle"
            required
            defaultValue={initial.heroSubtitle}
            hint="Use a new line for a second subtitle line."
            error={state.fieldErrors?.heroSubtitle}
          />
          <TextField
            label="Hero tagline"
            name="heroTagline"
            required
            defaultValue={initial.heroTagline}
            error={state.fieldErrors?.heroTagline}
          />
          <TextField
            label="Primary button text"
            name="primaryCtaText"
            required
            defaultValue={initial.primaryCtaText}
            error={state.fieldErrors?.primaryCtaText}
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
            name="secondaryCtaText"
            required
            defaultValue={initial.secondaryCtaText}
            error={state.fieldErrors?.secondaryCtaText}
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
          />
          <ImageDropzoneField
            label="Mobile hero image"
            name="heroMobileImage"
            variant="mobile"
            defaultValue={initial.heroMobileImage}
            error={state.fieldErrors?.heroMobileImage}
          />
        </div>
        <div className="mt-5">
          <TextareaField
            label="Hero description"
            name="heroDescription"
            rows={3}
            required
            defaultValue={initial.heroDescription}
            error={state.fieldErrors?.heroDescription}
          />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-white p-5">
        <legend className="px-2 font-display text-lg text-ink">Hero stats</legend>
        <HomeStatsEditor
          stats={stats}
          onChange={setStats}
          sectionError={statsSectionError}
          fieldErrors={state.fieldErrors}
        />
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-white p-5">
        <legend className="px-2 font-display text-lg text-ink">Mission preview</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Mission title"
            name="missionTitle"
            required
            defaultValue={initial.missionTitle}
            error={state.fieldErrors?.missionTitle}
          />
          <TextField
            label="Mission highlight"
            name="missionHighlight"
            required
            defaultValue={initial.missionHighlight}
            error={state.fieldErrors?.missionHighlight}
          />
        </div>
        <div className="mt-5">
          <TextareaField
            label="Mission text"
            name="missionText"
            rows={4}
            required
            defaultValue={initial.missionText}
            error={state.fieldErrors?.missionText}
          />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-white p-5">
        <legend className="px-2 font-display text-lg text-ink">Technology cards</legend>
        <HomeTechCardsEditor
          techCards={techCards}
          onChange={setTechCards}
          sectionError={techSectionError}
          fieldErrors={state.fieldErrors}
        />
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-white p-5">
        <legend className="px-2 font-display text-lg text-ink">Final CTA</legend>
        <div className="grid gap-5">
          <TextField
            label="CTA title"
            name="ctaTitle"
            required
            defaultValue={initial.ctaTitle}
            error={state.fieldErrors?.ctaTitle}
          />
          <TextareaField
            label="CTA description"
            name="ctaDescription"
            rows={3}
            required
            defaultValue={initial.ctaDescription}
            error={state.fieldErrors?.ctaDescription}
          />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-white p-5">
        <legend className="px-2 font-display text-lg text-ink">Home section copy</legend>
        <p className="mb-3 text-xs text-ink-muted">
          JSON for homepage section headers, virtual museum features, partnership categories, and about cards.
        </p>
        <textarea
          value={sectionsJson}
          onChange={(event) => setSectionsJson(event.target.value)}
          rows={18}
          className="w-full rounded-lg border border-stone-200 bg-parchment-50 px-3 py-2 font-mono text-xs text-ink shadow-sm focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/30"
          spellCheck={false}
        />
        {sectionsSectionError ? (
          <p className="mt-2 text-xs text-pomegranate">{sectionsSectionError}</p>
        ) : null}
      </fieldset>

      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message}
        </p>
      ) : null}
      {state.status === 'success' ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? 'Saving…' : 'Save homepage content'}
      </Button>
    </form>
  );
}
