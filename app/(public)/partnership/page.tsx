import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { PillarCard } from '@/components/cards/PillarCard';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Partnership',
  description:
    'Partner with Armenian Treasures — institutional, academic, corporate and individual partnerships.',
};

const PARTNERSHIPS = [
  {
    title: 'Institutional',
    description:
      'Foundations, ministries and diaspora associations underwrite full digitization campaigns of specific sites.',
    iconName: 'Building2',
  },
  {
    title: 'Academic',
    description:
      'Universities and research centres co-publish curated entries, contribute datasets and host fellowships.',
    iconName: 'GraduationCap',
  },
  {
    title: 'Corporate',
    description:
      'Technology and creative companies provide equipment, cloud capacity, or pro-bono engineering on the open platform.',
    iconName: 'Briefcase',
  },
  {
    title: 'Patron',
    description:
      'Individual patrons name a project — a monastery, a manuscript, a folk-art tradition — and follow its capture from start to finish.',
    iconName: 'HandHeart',
  },
];

function PartnershipPage() {
  return (
    <>
      <HeroPage
        eyebrow="Partnership"
        title="Build the archive with us."
        description="Armenian Treasures works with institutions, universities, companies and individual patrons. We tailor each partnership to the scope and pace of your contribution."
      />
      <Container className="py-20 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Why partner</Eyebrow>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Four ways to anchor the open archive.
            </h2>
            <p className="mt-5 text-base text-ink-soft sm:text-lg">
              Each partnership is documented in the archive itself — recognised on the relevant
              entries, in the annual report and at our donor wall.
            </p>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
              {PARTNERSHIPS.map((p) => (
                <StaggerItem key={p.title} className="h-full">
                  <PillarCard title={p.title} description={p.description} iconName={p.iconName} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <aside className="rounded-2xl bg-parchment-50 p-8 shadow-card lg:col-span-5">
            <Eyebrow>Get in touch</Eyebrow>
            <h3 className="mt-3 font-display text-2xl text-ink">
              Talk with our partnerships team.
            </h3>
            <p className="mt-4 text-sm text-ink-soft">
              Write to us with your scope, timeline and the kind of partnership you envision. We
              respond within five working days.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contacts" variant="primary" withArrow>
                Contact us
              </ButtonLink>
              <ButtonLink href="/donators" variant="ghost">
                View current partners
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

export default PartnershipPage;
