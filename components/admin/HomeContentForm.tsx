'use client';

import { useActionState, useState } from 'react';
import type { FormEvent } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
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
  type HomeStat,
  type HomeTechCard,
  validateHomeStatsClient,
  validateHomeTechCardsClient,
} from '@/lib/types/home-content';

const INITIAL: HomeContentFormState = { status: 'idle' };

interface Initial {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage: string;
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
}

interface Props {
  initial: Initial;
}

export function HomeContentForm({ initial }: Props) {
  const [state, formAction, isPending] = useActionState(saveHomeContentAction, INITIAL);
  const [stats, setStats] = useState<HomeStat[]>(initial.stats);
  const [techCards, setTechCards] = useState<HomeTechCard[]>(initial.techCards);
  const [clientSectionErrors, setClientSectionErrors] = useState<{
    stats?: string;
    techCards?: string;
  }>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const statsError = validateHomeStatsClient(stats);
    const techCardsError = validateHomeTechCardsClient(techCards);

    if (statsError || techCardsError) {
      event.preventDefault();
      setClientSectionErrors({
        stats: statsError,
        techCards: techCardsError,
      });
      return;
    }

    setClientSectionErrors({});
  };

  const statsSectionError =
    clientSectionErrors.stats ?? getSectionFieldError(state.fieldErrors, 'stats');
  const techCardsSectionError =
    clientSectionErrors.techCards ?? getSectionFieldError(state.fieldErrors, 'techCards');

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="stats" value={JSON.stringify(stats)} />
      <input type="hidden" name="techCards" value={JSON.stringify(techCards)} />

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Hero</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Badge" name="heroBadge" required defaultValue={initial.heroBadge} error={state.fieldErrors?.heroBadge} />
          <TextField label="Title" name="heroTitle" required defaultValue={initial.heroTitle} error={state.fieldErrors?.heroTitle} />
          <TextField label="Highlight" name="heroHighlight" required defaultValue={initial.heroHighlight} error={state.fieldErrors?.heroHighlight} />
          <TextField label="Image URL" name="heroImage" defaultValue={initial.heroImage} error={state.fieldErrors?.heroImage} />
          <TextField label="Primary CTA text" name="primaryCtaText" required defaultValue={initial.primaryCtaText} error={state.fieldErrors?.primaryCtaText} />
          <TextField label="Primary CTA URL" name="primaryCtaUrl" required defaultValue={initial.primaryCtaUrl} error={state.fieldErrors?.primaryCtaUrl} />
          <TextField label="Secondary CTA text" name="secondaryCtaText" required defaultValue={initial.secondaryCtaText} error={state.fieldErrors?.secondaryCtaText} />
          <TextField label="Secondary CTA URL" name="secondaryCtaUrl" required defaultValue={initial.secondaryCtaUrl} error={state.fieldErrors?.secondaryCtaUrl} />
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

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Stats</legend>
        <HomeStatsEditor
          stats={stats}
          onChange={setStats}
          sectionError={statsSectionError}
          fieldErrors={state.fieldErrors}
        />
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Mission</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Mission title" name="missionTitle" required defaultValue={initial.missionTitle} error={state.fieldErrors?.missionTitle} />
          <TextField label="Mission highlight" name="missionHighlight" required defaultValue={initial.missionHighlight} error={state.fieldErrors?.missionHighlight} />
        </div>
        <div className="mt-5">
          <TextareaField label="Mission text" name="missionText" rows={4} required defaultValue={initial.missionText} error={state.fieldErrors?.missionText} />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Technology cards</legend>
        <HomeTechCardsEditor
          techCards={techCards}
          onChange={setTechCards}
          sectionError={techCardsSectionError}
          fieldErrors={state.fieldErrors}
        />
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Final CTA</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="CTA title" name="ctaTitle" required defaultValue={initial.ctaTitle} error={state.fieldErrors?.ctaTitle} />
        </div>
        <div className="mt-5">
          <TextareaField label="CTA description" name="ctaDescription" rows={3} required defaultValue={initial.ctaDescription} error={state.fieldErrors?.ctaDescription} />
        </div>
      </fieldset>

      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      {state.status === 'success' ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? 'Saving…' : 'Save home content'}
      </Button>
    </form>
  );
}
