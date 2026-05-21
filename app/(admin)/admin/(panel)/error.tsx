'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 bg-parchment-200/30 p-12 text-center">
      <p className="eyebrow">Admin error</p>
      <h2 className="font-display text-3xl text-ink">An unexpected error occurred.</h2>
      <p className="max-w-md text-sm text-ink-soft">
        Try the action again. If the issue persists, check the server logs.
      </p>
      <Button onClick={reset} variant="primary" withArrow>
        Try again
      </Button>
    </div>
  );
}

export default AdminError;
