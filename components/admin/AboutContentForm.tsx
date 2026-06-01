'use client';

import { useActionState, useState } from 'react';
import type { FormEvent } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { AboutPillarsEditor } from '@/components/admin/AboutPillarsEditor';
import {
  saveAboutContentAction,
  type AboutContentFormState,
} from '@/app/(admin)/admin/(panel)/about-content/actions';
import {
  getSectionFieldError,
  type AboutPillar,
  validateAboutPillarsClient,
} from '@/lib/types/about-content';

const INITIAL: AboutContentFormState = { status: 'idle' };

interface Initial {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  missionEyebrow: string;
  missionTitle: string;
  missionIntro: string;
  pillars: AboutPillar[];
  whyNowHeading: string;
  whyNowBody: string;
  howWeWorkHeading: string;
  howWeWorkBody: string;
  teamEyebrow: string;
  teamTitle: string;
  teamIntro: string;
  careerEyebrow: string;
  careerTitle: string;
  careerIntro: string;
}

interface Props {
  initial: Initial;
}

export function AboutContentForm({ initial }: Props) {
  const [state, formAction, isPending] = useActionState(saveAboutContentAction, INITIAL);
  const [pillars, setPillars] = useState<AboutPillar[]>(initial.pillars);
  const [clientPillarsError, setClientPillarsError] = useState<string | undefined>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const pillarsError = validateAboutPillarsClient(pillars);
    if (pillarsError) {
      event.preventDefault();
      setClientPillarsError(pillarsError);
      return;
    }
    setClientPillarsError(undefined);
  };

  const pillarsSectionError =
    clientPillarsError ?? getSectionFieldError(state.fieldErrors, 'pillars');

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="pillars" value={JSON.stringify(pillars)} />

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Shared About hero</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Eyebrow"
            name="heroEyebrow"
            required
            defaultValue={initial.heroEyebrow}
            error={state.fieldErrors?.heroEyebrow}
          />
          <TextField
            label="Title"
            name="heroTitle"
            required
            defaultValue={initial.heroTitle}
            error={state.fieldErrors?.heroTitle}
          />
        </div>
        <div className="mt-5">
          <TextareaField
            label="Description"
            name="heroDescription"
            rows={3}
            required
            defaultValue={initial.heroDescription}
            error={state.fieldErrors?.heroDescription}
          />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Mission header</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Eyebrow"
            name="missionEyebrow"
            required
            defaultValue={initial.missionEyebrow}
            error={state.fieldErrors?.missionEyebrow}
          />
          <TextField
            label="Title"
            name="missionTitle"
            required
            defaultValue={initial.missionTitle}
            error={state.fieldErrors?.missionTitle}
          />
        </div>
        <div className="mt-5">
          <TextareaField
            label="Intro"
            name="missionIntro"
            rows={4}
            required
            defaultValue={initial.missionIntro}
            error={state.fieldErrors?.missionIntro}
          />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Mission pillars</legend>
        <AboutPillarsEditor
          pillars={pillars}
          onChange={setPillars}
          sectionError={pillarsSectionError}
          fieldErrors={state.fieldErrors}
        />
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Mission prose</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Why now heading"
            name="whyNowHeading"
            required
            defaultValue={initial.whyNowHeading}
            error={state.fieldErrors?.whyNowHeading}
          />
          <TextField
            label="How we work heading"
            name="howWeWorkHeading"
            required
            defaultValue={initial.howWeWorkHeading}
            error={state.fieldErrors?.howWeWorkHeading}
          />
        </div>
        <div className="mt-5 grid gap-5">
          <TextareaField
            label="Why now body"
            name="whyNowBody"
            rows={4}
            required
            defaultValue={initial.whyNowBody}
            error={state.fieldErrors?.whyNowBody}
          />
          <TextareaField
            label="How we work body"
            name="howWeWorkBody"
            rows={4}
            required
            defaultValue={initial.howWeWorkBody}
            error={state.fieldErrors?.howWeWorkBody}
          />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Team page intro</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Eyebrow"
            name="teamEyebrow"
            required
            defaultValue={initial.teamEyebrow}
            error={state.fieldErrors?.teamEyebrow}
          />
          <TextField
            label="Title"
            name="teamTitle"
            required
            defaultValue={initial.teamTitle}
            error={state.fieldErrors?.teamTitle}
          />
        </div>
        <div className="mt-5">
          <TextareaField
            label="Intro"
            name="teamIntro"
            rows={3}
            required
            defaultValue={initial.teamIntro}
            error={state.fieldErrors?.teamIntro}
          />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Career page intro</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Eyebrow"
            name="careerEyebrow"
            required
            defaultValue={initial.careerEyebrow}
            error={state.fieldErrors?.careerEyebrow}
          />
          <TextField
            label="Title"
            name="careerTitle"
            required
            defaultValue={initial.careerTitle}
            error={state.fieldErrors?.careerTitle}
          />
        </div>
        <div className="mt-5">
          <TextareaField
            label="Intro"
            name="careerIntro"
            rows={3}
            required
            defaultValue={initial.careerIntro}
            error={state.fieldErrors?.careerIntro}
          />
        </div>
      </fieldset>

      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      {state.status === 'success' ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? 'Saving…' : 'Save about content'}
      </Button>
    </form>
  );
}
