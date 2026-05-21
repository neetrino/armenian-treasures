import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';

function RootNotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-parchment">
      <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <Eyebrow>Lost in the archive</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">
          404 · Page not found
        </h1>
        <p className="mt-4 max-w-xl text-base text-ink-soft">
          The path you followed does not exist in the foundation&apos;s map. Return to the home
          page or explore the Culture Portal.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" variant="primary" withArrow>
            Return home
          </ButtonLink>
          <Link href="/culture" className="text-sm text-pomegranate hover:underline">
            Open the Culture Portal
          </Link>
        </div>
      </Container>
    </main>
  );
}

export default RootNotFound;
