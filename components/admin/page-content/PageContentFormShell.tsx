'use client';

import { useActionState, useEffect, useRef, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  savePageContentAction,
  type PageContentFormState,
} from '@/app/(admin)/admin/(panel)/page-content/actions';
import type { PageContentSlug } from '@/lib/types/page-content';

const INITIAL: PageContentFormState = { status: 'idle' };

interface PageContentFormShellProps {
  slug: PageContentSlug;
  content: Record<string, unknown>;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => boolean | void;
  children: ReactNode;
}

export function PageContentFormShell({ slug, content, onSubmit, children }: PageContentFormShellProps) {
  const router = useRouter();
  const boundAction = savePageContentAction.bind(null, slug);
  const [state, formAction, isPending] = useActionState(boundAction, INITIAL);
  const lastSuccessRef = useRef<string | null>(null);

  useEffect(() => {
    if (state.status !== 'success' || !state.message) return;
    if (lastSuccessRef.current === state.message) return;
    lastSuccessRef.current = state.message;
    router.refresh();
  }, [router, state.message, state.status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    if (onSubmit?.(event) === false) {
      event.preventDefault();
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="contentJson" value={JSON.stringify(content)} readOnly />
      {children}
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      {state.status === 'success' ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
      ) : null}
      <div className="sticky bottom-0 -mx-6 border-t border-stone-100 bg-white/95 px-6 py-4 backdrop-blur-sm">
        <Button type="submit" disabled={isPending} withArrow>
          {isPending ? 'Saving…' : 'Save page content'}
        </Button>
      </div>
    </form>
  );
}
