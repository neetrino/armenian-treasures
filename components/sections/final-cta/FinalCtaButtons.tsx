import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FinalCtaFloralIcon } from '@/components/sections/final-cta/FinalCtaFloralIcon';

const CTA_BASE =
  'group inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-medium tracking-wide transition-all duration-300 ease-cinematic motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-400 focus-visible:ring-offset-2';

export function FinalCtaButtons() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
      <Link
        href="/partnership"
        className={`${CTA_BASE} bg-gradient-to-r from-[#F28C48] via-[#D94A3A] to-pomegranate-700 text-white shadow-[0_10px_28px_-10px_rgba(126,28,38,0.55)] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(242,140,72,0.45)] motion-reduce:hover:translate-y-0`}
      >
        <FinalCtaFloralIcon className="h-4 w-4 shrink-0 text-white/95" />
        <span>Become a partner</span>
        <ArrowRight
          size={16}
          className="shrink-0 transition-transform duration-300 ease-cinematic group-hover:translate-x-0.5 motion-reduce:transform-none"
          aria-hidden
        />
      </Link>
      <Link
        href="/projects"
        className={`${CTA_BASE} border border-pomegranate-700/75 bg-parchment/40 text-pomegranate-700 backdrop-blur-sm hover:-translate-y-0.5 hover:border-pomegranate-700 hover:bg-parchment/70 motion-reduce:hover:translate-y-0`}
      >
        <FinalCtaFloralIcon className="h-4 w-4 shrink-0 text-pomegranate-700/90" />
        <span>Fund a project</span>
      </Link>
    </div>
  );
}
