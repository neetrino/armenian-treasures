import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface AdminStickySaveBarProps {
  label: string;
  isPending?: boolean;
  successMessage?: string;
  errorMessage?: string;
  extra?: ReactNode;
  className?: string;
}

export function AdminStickySaveBar({
  label,
  isPending = false,
  successMessage,
  errorMessage,
  extra,
  className,
}: AdminStickySaveBarProps) {
  return (
    <div
      className={cn(
        'sticky bottom-3 z-30 mx-auto mt-6 w-full max-w-3xl motion-safe:animate-admin-bar-up motion-reduce:animate-none',
        className,
      )}
    >
      <div className="rounded-2xl border border-stone-200/80 bg-white/95 p-3 shadow-[0_8px_32px_-8px_rgba(26,23,20,0.25)] backdrop-blur-md sm:p-4">
        {errorMessage ? (
          <p className="mb-3 rounded-xl bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate motion-safe:animate-admin-scale-in">
            {errorMessage}
          </p>
        ) : null}
        {successMessage ? (
          <p className="mb-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800 motion-safe:animate-admin-scale-in">
            {successMessage}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {extra}
          <Button type="submit" disabled={isPending} withArrow className="ml-auto min-w-[9rem]">
            {isPending ? 'Saving…' : label}
          </Button>
        </div>
      </div>
    </div>
  );
}
