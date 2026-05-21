import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FadeUp } from '@/components/motion/FadeUp';

interface MissionPreviewSectionProps {
  title: string;
  highlight: string;
  text: string;
}

export function MissionPreviewSection({ title, highlight, text }: MissionPreviewSectionProps) {
  return (
    <section className="bg-parchment py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeUp className="lg:col-span-7">
          <Eyebrow>The Foundation</Eyebrow>
          <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            {title} <span className="italic text-bronze-600">{highlight}</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/about/mission" variant="secondary" withArrow>
              Read our mission
            </ButtonLink>
            <ButtonLink href="/about/team" variant="ghost">
              Meet the team
            </ButtonLink>
          </div>
        </FadeUp>
        <FadeUp className="lg:col-span-5" delay={0.1}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-card">
            <KhachkarIllustration className="absolute inset-0 h-full w-full text-pomegranate-800" />
            <div className="absolute inset-0 bg-gradient-to-tr from-midnight-900/40 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-parchment-50">
              <p className="eyebrow text-bronze-400">Khachkar</p>
              <p className="mt-1 font-display text-lg leading-tight">
                Prayer translated into stone
              </p>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

interface KhachkarProps {
  className?: string;
}

function KhachkarIllustration({ className }: KhachkarProps) {
  return (
    <svg viewBox="0 0 320 400" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grain" width="2" height="2" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="rgba(0,0,0,0.05)" />
        </pattern>
      </defs>
      <rect width="320" height="400" fill="#E8DDC5" />
      <rect width="320" height="400" fill="url(#grain)" />
      <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.95">
        <rect x="80" y="40" width="160" height="320" rx="6" />
        <path d="M120 90 L160 70 L200 90 L160 110 Z" />
        <path d="M120 90 L160 110 L160 170 L120 150 Z" />
        <path d="M200 90 L160 110 L160 170 L200 150 Z" />
        <path d="M160 170 L140 200 L160 230 L180 200 Z" />
        <path d="M120 200 L100 220 L120 240 L140 220 Z" />
        <path d="M200 200 L180 220 L200 240 L220 220 Z" />
        <path d="M160 230 L140 260 L160 290 L180 260 Z" />
        <path d="M110 320 L160 300 L210 320" />
        <circle cx="160" cy="200" r="3" fill="currentColor" />
      </g>
    </svg>
  );
}
