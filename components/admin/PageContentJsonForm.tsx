'use client';

import { useActionState, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import {
  savePageContentAction,
  type PageContentFormState,
} from '@/app/(admin)/admin/(panel)/page-content/actions';
import type { PageContentSlug } from '@/lib/types/page-content';

const INITIAL: PageContentFormState = { status: 'idle' };

interface Props {
  slug: PageContentSlug;
  initialJson: string;
}

export function PageContentJsonForm({ slug, initialJson }: Props) {
  const boundAction = savePageContentAction.bind(null, slug);
  const [state, formAction, isPending] = useActionState(boundAction, INITIAL);
  const [contentJson, setContentJson] = useState(initialJson);
  const [clientError, setClientError] = useState<string | undefined>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    try {
      JSON.parse(contentJson);
      setClientError(undefined);
    } catch {
      event.preventDefault();
      setClientError('Invalid JSON syntax.');
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="contentJson" value={contentJson} readOnly />
      <p className="text-xs text-ink-muted">
        Edit the full page content as JSON. Invalid JSON will be rejected on save.
      </p>
      <textarea
        value={contentJson}
        onChange={(event) => setContentJson(event.target.value)}
        rows={28}
        spellCheck={false}
        className="w-full rounded-lg border border-stone-200 bg-parchment-50 px-3 py-2 font-mono text-xs text-ink shadow-sm focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/30"
      />
      {clientError ? <p className="text-xs text-pomegranate">{clientError}</p> : null}
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      {state.status === 'success' ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? 'Saving…' : 'Save page content'}
      </Button>
    </form>
  );
}
