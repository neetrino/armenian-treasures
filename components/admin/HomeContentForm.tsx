'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import {
  saveHomeContentAction,
  type HomeContentFormState,
} from '@/app/(admin)/admin/(panel)/home-content/actions';

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
  stats: string;
  missionTitle: string;
  missionHighlight: string;
  missionText: string;
  techCards: string;
  ctaTitle: string;
  ctaDescription: string;
}

interface Props {
  initial: Initial;
}

export function HomeContentForm({ initial }: Props) {
  const [state, formAction] = useFormState(saveHomeContentAction, INITIAL);
  return (
    <form action={formAction} className="flex flex-col gap-6">
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
        <legend className="px-2 font-display text-lg text-ink">Stats (JSON array)</legend>
        <TextareaField
          label='[{"value":"180+","label":"Monuments scanned"}, …]'
          name="stats"
          rows={4}
          defaultValue={initial.stats}
          hint="Each stat: { value, label }. Min 1, max 8."
          error={state.fieldErrors?.stats}
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
        <legend className="px-2 font-display text-lg text-ink">Technology cards (JSON array)</legend>
        <TextareaField
          label='[{"title":"…","description":"…","icon":"Building2"}, …]'
          name="techCards"
          rows={5}
          defaultValue={initial.techCards}
          hint="Each card: { title, description, icon }. icon = a lucide-react name."
          error={state.fieldErrors?.techCards}
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
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} withArrow>
      {pending ? 'Saving…' : 'Save home content'}
    </Button>
  );
}
