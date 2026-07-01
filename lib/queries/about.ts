import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicAboutContent, type PublicAboutContentDTO } from '@/lib/dto';
import { normalizeAboutPillars, type AboutPillar } from '@/lib/types/about-content';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';

const FALLBACK_PILLARS: AboutPillar[] = [
  {
    title: 'Permanent digitization',
    description:
      'Every monument we visit becomes a redundant, open digital twin — secured against erosion, conflict and time.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Curated scholarship',
    description:
      'Each entry is researched and cross-checked with Armenian academic institutions, then published with full citations.',
    iconName: 'BookOpen',
  },
  {
    title: 'Open access for everyone',
    description:
      'The archive is free for scholars, teachers, students and the diaspora — released under Creative Commons whenever possible.',
    iconName: 'Globe2',
  },
];

export const FALLBACK_ABOUT_CONTENT: PublicAboutContentDTO = {
  heroEyebrow: 'About the Foundation',
  heroTitle: "Stewards of Armenia's living memory.",
  heroDescription:
    'A non-profit dedicated to the permanent, open digital preservation of Armenian cultural heritage.',
  heroImage: resolvePageHeroImageUrl(),
  missionEyebrow: 'Mission',
  missionTitle: 'A permanent, open digital memory of Armenia.',
  missionIntro:
    'We work alongside the Ministry of Education, Science, Culture and Sports of Armenia, the Mother See of Holy Etchmiadzin, the Matenadaran, regional museums and a community of diaspora partners to preserve the country\u2019s cultural memory at archival quality.',
  pillars: FALLBACK_PILLARS,
  whyNowHeading: 'Why now',
  whyNowBody:
    'Armenia preserves more than 24,000 monuments above ground and an order of magnitude more beneath. Each year, weathering, neglect and conflict claim irreplaceable detail. A high-resolution digital twin — accessible, redundant, free — is the only way to ensure that the work of medieval masons, scribes and weavers reaches the next thousand years.',
  howWeWorkHeading: 'How we work',
  howWeWorkBody:
    'Fieldwork is led by certified Matterport operators and drone pilots, supported by architectural historians. Captured data is processed, annotated and reviewed by our curators before being added to the public archive.',
  teamEyebrow: 'Team',
  teamTitle: 'A small, deeply specialised team.',
  teamIntro:
    'Historians, technologists and curators working full-time on the open digital archive of Armenian heritage.',
  careerEyebrow: 'Career',
  careerTitle: 'Build the archive of a civilisation.',
  careerIntro:
    'We are hiring engineers, drone pilots and cultural researchers across Yerevan, the regions and remote. Send us your work — we read every application.',
};

async function fetchAboutContent(): Promise<PublicAboutContentDTO> {
  try {
    const locale = await getCurrentSiteLocale();
    const row = await prisma.aboutContent.findFirst();
    if (!row) return FALLBACK_ABOUT_CONTENT;
    const content = toPublicAboutContent(row, locale);
    return {
      ...content,
      heroImage: resolvePageHeroImageUrl(content.heroImage),
      pillars:
        normalizeAboutPillars(content.pillars).length > 0
          ? normalizeAboutPillars(content.pillars)
          : FALLBACK_PILLARS,
    };
  } catch {
    return FALLBACK_ABOUT_CONTENT;
  }
}

export const getAboutContent = unstable_cache(fetchAboutContent, ['about-content'], {
  tags: ['about-content'],
  revalidate: 60,
});
