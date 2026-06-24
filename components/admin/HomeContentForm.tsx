'use client';

import { useActionState } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { ImageDropzoneField } from '@/components/forms/fields/ImageDropzoneField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import {
  saveHomeContentAction,
  type HomeContentFormState,
} from '@/app/(admin)/admin/(panel)/home-content/actions';

const INITIAL: HomeContentFormState = { status: 'idle' };

export interface HomeHeroFormInitial {
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage: string;
  heroMobileImage: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
}

interface Props {
  initial: HomeHeroFormInitial;
}

export function HomeContentForm({ initial }: Props) {
  const [state, formAction, isPending] = useActionState(saveHomeContentAction, INITIAL);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Hero</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Hero title"
            name="heroTitle"
            required
            defaultValue={initial.heroTitle}
            hint="First line of the homepage hero title."
            error={state.fieldErrors?.heroTitle}
          />
          <TextField
            label="Hero highlighted title"
            name="heroHighlight"
            required
            defaultValue={initial.heroHighlight}
            hint="Second highlighted line of the homepage hero title."
            error={state.fieldErrors?.heroHighlight}
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
            hint="Main hero image used on desktop screens."
            error={state.fieldErrors?.heroImage}
          />
          <ImageDropzoneField
            label="Mobile hero image"
            name="heroMobileImage"
            variant="mobile"
            defaultValue={initial.heroMobileImage}
            hint="Optional. If empty, the desktop hero image will be used on mobile."
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

      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message}
        </p>
      ) : null}
      {state.status === 'success' ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? 'Saving…' : 'Save hero section'}
      </Button>
    </form>
  );
}
