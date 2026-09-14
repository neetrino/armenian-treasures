import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { ButtonLink } from '@/components/ui/Button';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

async function PublicNotFound() {
  const locale = await getCurrentSiteLocale();

  return (
    <>
      <HeroPage
        eyebrow="404"
        title={uiMessage(locale, 'lostInArchive')}
        description={uiMessage(locale, 'notFoundDescription')}
        size="sm"
      />
      <Container className="flex flex-col items-start gap-3 py-20">
        <ButtonLink href="/" variant="primary" withArrow>
          {uiMessage(locale, 'returnHome')}
        </ButtonLink>
        <Link href="/culture" className="text-sm text-pomegranate hover:underline">
          {uiMessage(locale, 'orOpenCulturePortal')}
        </Link>
      </Container>
    </>
  );
}

export default PublicNotFound;
