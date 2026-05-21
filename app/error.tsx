'use client';

import { useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error('Root error:', error);
  }, [error]);
  return (
    <main className="flex min-h-screen flex-col bg-parchment">
      <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-ink">An unexpected error occurred.</h1>
        <p className="mt-4 max-w-xl text-base text-ink-soft">
          Please try again. If the problem persists, contact the foundation administrator.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} variant="primary" withArrow>
            Try again
          </Button>
        </div>
      </Container>
    </main>
  );
}

export default RootError;
