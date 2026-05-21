import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { OrnamentRight } from '@/components/brand/OrnamentRight';

interface FinalCtaSectionProps {
  title: string;
  description: string;
}

export function FinalCtaSection({ title, description }: FinalCtaSectionProps) {
  return (
    <section className="bg-parchment pt-0 pb-20 lg:pb-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-pomegranate-700 via-pomegranate-800/95 to-midnight-900 p-10 text-parchment-50 sm:p-14 lg:p-20">
          <OrnamentRight
            aria-hidden
            className="pointer-events-none absolute right-6 top-1/2 hidden h-[320px] -translate-y-1/2 text-bronze-400/40 lg:block"
          />
          <div className="relative max-w-2xl">
            <Eyebrow tone="parchment" className="text-bronze-400">
              Support the foundation
            </Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-base text-parchment-200/90 sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/partnership" variant="primary" size="lg" withArrow>
                Become a partner
              </ButtonLink>
              <ButtonLink href="/projects" variant="on-dark" size="lg">
                Fund a project
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
