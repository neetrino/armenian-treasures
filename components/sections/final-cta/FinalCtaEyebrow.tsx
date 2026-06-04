import { FinalCtaFloralIcon } from '@/components/sections/final-cta/FinalCtaFloralIcon';

export function FinalCtaEyebrow() {
  return (
    <div className="flex items-center gap-2.5">
      <FinalCtaFloralIcon className="h-3.5 w-3.5 shrink-0 text-pomegranate-700/85" />
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-pomegranate-700/90 sm:text-xs">
        Support the foundation
      </p>
    </div>
  );
}
