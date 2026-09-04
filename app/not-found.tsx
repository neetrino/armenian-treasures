import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

async function RootNotFound() {
  const locale = await getCurrentSiteLocale();

  return (
    <main className="flex min-h-screen flex-col bg-parchment">
      <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <Eyebrow>{uiMessage(locale, 'lostInArchive')}</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">
          {uiMessage(locale, 'pageNotFound')}
        </h1>
        <p className="mt-4 max-w-xl text-base text-ink-soft">
          {uiMessage(locale, 'notFoundDescription')}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" variant="primary" withArrow>
            {uiMessage(locale, 'returnHome')}
          </ButtonLink>
          <Link href="/culture" className="text-sm text-pomegranate hover:underline">
            {uiMessage(locale, 'openCulturePortal')}
          </Link>
        </div>
      </Container>
    </main>
  );
}

export default RootNotFound;
