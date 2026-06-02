import { Container } from '@/components/layout/Container';
import { MissionFoundationBackground } from '@/components/sections/mission/MissionFoundationBackground';
import { MissionFoundationOverlay } from '@/components/sections/mission/MissionFoundationOverlay';
import { MissionSectionBottomBlend } from '@/components/sections/mission/MissionSectionBottomBlend';
import { MissionPreviewContent } from '@/components/sections/mission/MissionPreviewContent';
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
      <MissionSectionBottomBlend />

      <Container
        className={`relative z-10 flex w-full items-center pb-[clamp(3.5rem,9vw,7rem)] pt-14 sm:pb-[clamp(4rem,10vw,7.5rem)] sm:pt-16 lg:pb-[clamp(4.5rem,11vw,8rem)] lg:pt-20 xl:pt-24 ${SECTION_MIN_H}`}
      >
        <MissionPreviewContent
          line1={line1}
          line2={line2}
          highlight={highlight}
          text={text}
        />
      </Container>
    </section>
  );
}
