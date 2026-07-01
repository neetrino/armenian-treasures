'use client';

import { useActionState, useState } from 'react';
import type { FormEvent } from 'react';
import { TranslatableFieldsTabs } from '@/components/admin/TranslatableFieldsTabs';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
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
import {
  buildTabErrorMap,
  decodeTranslatableText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const INITIAL: AboutContentFormState = { status: 'idle' };

interface Initial {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
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
  const tabErrors = buildTabErrorMap(state.fieldErrors);

  const valueFor = (values: LocaleTextMap, locale: SiteLocaleCode): string => values[locale] ?? '';
  const heroEyebrow = decodeTranslatableText(initial.heroEyebrow);
  const heroTitle = decodeTranslatableText(initial.heroTitle);
  const heroDescription = decodeTranslatableText(initial.heroDescription);
  const missionEyebrow = decodeTranslatableText(initial.missionEyebrow);
  const missionTitle = decodeTranslatableText(initial.missionTitle);
  const missionIntro = decodeTranslatableText(initial.missionIntro);
  const whyNowHeading = decodeTranslatableText(initial.whyNowHeading);
  const whyNowBody = decodeTranslatableText(initial.whyNowBody);
  const howWeWorkHeading = decodeTranslatableText(initial.howWeWorkHeading);
  const howWeWorkBody = decodeTranslatableText(initial.howWeWorkBody);
  const teamEyebrow = decodeTranslatableText(initial.teamEyebrow);
  const teamTitle = decodeTranslatableText(initial.teamTitle);
  const teamIntro = decodeTranslatableText(initial.teamIntro);
  const careerEyebrow = decodeTranslatableText(initial.careerEyebrow);
  const careerTitle = decodeTranslatableText(initial.careerTitle);
  const careerIntro = decodeTranslatableText(initial.careerIntro);

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

      <AdminImageDropzoneField
        label="Hero banner image"
        name="heroImage"
        folder="hero"
        defaultValue={initial.heroImage}
        error={state.fieldErrors?.heroImage}
        hint="Optional wide banner at the top of About pages. Remove to use the default gradient background."
      />

      <TranslatableFieldsTabs tabErrors={tabErrors}>
        {(locale) => (
          <div className="flex flex-col gap-6">
            <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
              <legend className="px-2 font-display text-lg text-ink">Shared About hero</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Eyebrow"
                  name={`heroEyebrow.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(heroEyebrow, locale)}
                  error={state.fieldErrors?.[`heroEyebrow.${locale}`]}
                />
                <TextField
                  label="Title"
                  name={`heroTitle.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(heroTitle, locale)}
                  error={state.fieldErrors?.[`heroTitle.${locale}`]}
                />
              </div>
              <div className="mt-5">
                <TextareaField
                  label="Description"
                  name={`heroDescription.${locale}`}
                  rows={3}
                  required={locale === 'EN'}
                  defaultValue={valueFor(heroDescription, locale)}
                  error={state.fieldErrors?.[`heroDescription.${locale}`]}
                />
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
              <legend className="px-2 font-display text-lg text-ink">Mission header</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Eyebrow"
                  name={`missionEyebrow.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(missionEyebrow, locale)}
                  error={state.fieldErrors?.[`missionEyebrow.${locale}`]}
                />
                <TextField
                  label="Title"
                  name={`missionTitle.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(missionTitle, locale)}
                  error={state.fieldErrors?.[`missionTitle.${locale}`]}
                />
              </div>
              <div className="mt-5">
                <TextareaField
                  label="Intro"
                  name={`missionIntro.${locale}`}
                  rows={4}
                  required={locale === 'EN'}
                  defaultValue={valueFor(missionIntro, locale)}
                  error={state.fieldErrors?.[`missionIntro.${locale}`]}
                />
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
              <legend className="px-2 font-display text-lg text-ink">Mission prose</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Why now heading"
                  name={`whyNowHeading.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(whyNowHeading, locale)}
                  error={state.fieldErrors?.[`whyNowHeading.${locale}`]}
                />
                <TextField
                  label="How we work heading"
                  name={`howWeWorkHeading.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(howWeWorkHeading, locale)}
                  error={state.fieldErrors?.[`howWeWorkHeading.${locale}`]}
                />
              </div>
              <div className="mt-5 grid gap-5">
                <TextareaField
                  label="Why now body"
                  name={`whyNowBody.${locale}`}
                  rows={4}
                  required={locale === 'EN'}
                  defaultValue={valueFor(whyNowBody, locale)}
                  error={state.fieldErrors?.[`whyNowBody.${locale}`]}
                />
                <TextareaField
                  label="How we work body"
                  name={`howWeWorkBody.${locale}`}
                  rows={4}
                  required={locale === 'EN'}
                  defaultValue={valueFor(howWeWorkBody, locale)}
                  error={state.fieldErrors?.[`howWeWorkBody.${locale}`]}
                />
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
              <legend className="px-2 font-display text-lg text-ink">Team page intro</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Eyebrow"
                  name={`teamEyebrow.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(teamEyebrow, locale)}
                  error={state.fieldErrors?.[`teamEyebrow.${locale}`]}
                />
                <TextField
                  label="Title"
                  name={`teamTitle.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(teamTitle, locale)}
                  error={state.fieldErrors?.[`teamTitle.${locale}`]}
                />
              </div>
              <div className="mt-5">
                <TextareaField
                  label="Intro"
                  name={`teamIntro.${locale}`}
                  rows={3}
                  required={locale === 'EN'}
                  defaultValue={valueFor(teamIntro, locale)}
                  error={state.fieldErrors?.[`teamIntro.${locale}`]}
                />
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
              <legend className="px-2 font-display text-lg text-ink">Career page intro</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Eyebrow"
                  name={`careerEyebrow.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(careerEyebrow, locale)}
                  error={state.fieldErrors?.[`careerEyebrow.${locale}`]}
                />
                <TextField
                  label="Title"
                  name={`careerTitle.${locale}`}
                  required={locale === 'EN'}
                  defaultValue={valueFor(careerTitle, locale)}
                  error={state.fieldErrors?.[`careerTitle.${locale}`]}
                />
              </div>
              <div className="mt-5">
                <TextareaField
                  label="Intro"
                  name={`careerIntro.${locale}`}
                  rows={3}
                  required={locale === 'EN'}
                  defaultValue={valueFor(careerIntro, locale)}
                  error={state.fieldErrors?.[`careerIntro.${locale}`]}
                />
              </div>
            </fieldset>
          </div>
        )}
      </TranslatableFieldsTabs>

      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Mission pillars</legend>
        <AboutPillarsEditor
          pillars={pillars}
          onChange={setPillars}
          sectionError={pillarsSectionError}
          fieldErrors={state.fieldErrors}
        />
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
