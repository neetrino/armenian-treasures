import { Container } from '@/components/layout/Container';
import { FinalCtaBackground } from '@/components/sections/final-cta/FinalCtaBackground';
import { FinalCtaBadge } from '@/components/sections/final-cta/FinalCtaBadge';
import { FinalCtaButtons } from '@/components/sections/final-cta/FinalCtaButtons';
import { FinalCtaEyebrow } from '@/components/sections/final-cta/FinalCtaEyebrow';
import { FinalCtaTitle } from '@/components/sections/final-cta/FinalCtaTitle';

interface FinalCtaSectionProps {
  title: string;
  description: string;
}

export function FinalCtaSection({ title, description }: FinalCtaSectionProps) {
  return (
    <section className="bg-parchment pt-0 pb-20 lg:pb-28">
      <Container>
        <div className="relative isolate min-h-[18rem] overflow-hidden rounded-3xl p-8 sm:min-h-[20rem] sm:p-10 lg:min-h-[22rem] lg:p-14 xl:p-16">
          <FinalCtaBackground />
          <FinalCtaBadge />
          <div className="relative z-10 flex min-h-[inherit] w-full items-center py-2 sm:py-4">
            <div className="relative max-w-2xl px-1 sm:px-2">
              <FinalCtaEyebrow />
              <FinalCtaTitle title={title} />
              <div
                className="mt-5 h-px w-12 bg-gradient-to-r from-bronze-500/80 to-bronze-400/20"
                aria-hidden
              />
              <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base sm:leading-relaxed">
                {description}
              </p>
              <FinalCtaButtons />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
