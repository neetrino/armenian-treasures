import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { FadeUp } from '@/components/motion/FadeUp';
import { MissionFoundationBackground } from '@/components/sections/mission/MissionFoundationBackground';
import { MissionFoundationOverlay } from '@/components/sections/mission/MissionFoundationOverlay';
import { splitMissionTitle } from '@/components/sections/mission/split-mission-title';

interface MissionPreviewSectionProps {
  title: string;
  highlight: string;
  text: string;
}

const SECTION_MIN_H =
  'min-h-[30rem] sm:min-h-[34rem] lg:min-h-[40rem] xl:min-h-[44rem]';

export function MissionPreviewSection({ title, highlight, text }: MissionPreviewSectionProps) {
  const { line1, line2 } = splitMissionTitle(title);

  return (
    <section
      className={`foundation-section relative isolate w-full overflow-hidden ${SECTION_MIN_H}`}
      aria-labelledby="foundation-heading"
    >
      <MissionFoundationBackground />
      <MissionFoundationOverlay />

      <Container
        className={`relative z-10 flex w-full items-center py-14 sm:py-16 lg:py-20 xl:py-24 ${SECTION_MIN_H}`}
      >
        <FadeUp className="w-full max-w-xl lg:max-w-[46%] xl:max-w-[42rem]">
          <h2
            id="foundation-heading"
            className="font-display text-[2.35rem] leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"
          >
            <span className="block">{line1}</span>
            {line2 ? <span className="block">{line2}</span> : null}
            <span className="mt-0.5 block italic text-bronze-700">{highlight}</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-7 sm:text-lg sm:leading-relaxed">
            {text}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-9">
            <ButtonLink href="/about/mission" variant="secondary" size="lg" withArrow>
              Explore the mission
            </ButtonLink>
            <ButtonLink
              href="/about/team"
              variant="ghost"
              size="lg"
              withArrow
              className="text-pomegranate hover:text-pomegranate-700"
            >
              Meet the team
            </ButtonLink>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
