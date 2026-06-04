import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FooterDivider } from '@/components/layout/footer/FooterDivider';
import { FooterMonasteryIcon } from '@/components/layout/footer/FooterMonasteryIcon';
import { cn } from '@/lib/utils';

function CtaCorner({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 8 V2 H8" stroke="currentColor" strokeWidth="0.75" />
      <path d="M4 4 L6 6" stroke="currentColor" strokeWidth="0.5" opacity="0.65" />
    </svg>
  );
}

interface FooterCtaBoxProps {
  className?: string;
}

export function FooterCtaBox({ className }: FooterCtaBoxProps) {
  return (
    <aside className={cn('relative w-full min-w-0 shrink-0', className)}>
      <div className="relative rounded-sm border border-bronze-400/35 bg-midnight-900/25 px-6 py-7 backdrop-blur-sm">
        <CtaCorner className="absolute left-2 top-2 h-5 w-5 text-bronze-400/75" />
        <CtaCorner className="absolute right-2 top-2 h-5 w-5 rotate-90 text-bronze-400/75" />
        <CtaCorner className="absolute bottom-2 left-2 h-5 w-5 -rotate-90 text-bronze-400/75" />
        <CtaCorner className="absolute bottom-2 right-2 h-5 w-5 rotate-180 text-bronze-400/75" />

        <FooterMonasteryIcon />
        <h3 className="mt-4 text-center font-display text-sm uppercase tracking-[0.14em] text-parchment-100">
          Support our heritage
        </h3>
        <FooterDivider className="my-4" />
        <p className="text-center text-sm leading-relaxed text-parchment-200/82">
          Your support helps safeguard Armenia&apos;s cultural legacy for generations to come.
        </p>
        <Link
          href="/partnership"
          className="group mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-hero-gold-btn text-sm font-medium uppercase tracking-wide text-midnight-900 shadow-[0_8px_24px_-8px_rgba(200,132,61,0.55)] transition hover:-translate-y-0.5 hover:brightness-105 motion-reduce:hover:translate-y-0"
        >
          Donate now
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
            aria-hidden
          />
        </Link>
      </div>
    </aside>
  );
}
