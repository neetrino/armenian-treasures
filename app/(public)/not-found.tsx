import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { ButtonLink } from '@/components/ui/Button';

function PublicNotFound() {
  return (
    <>
      <HeroPage
        eyebrow="404"
        title="Lost in the archive."
        description="The page you were looking for does not exist or has been moved."
        size="sm"
      />
      <Container className="flex flex-col items-start gap-3 py-20">
        <ButtonLink href="/" variant="primary" withArrow>
          Return home
        </ButtonLink>
        <Link href="/culture" className="text-sm text-pomegranate hover:underline">
          Or open the Culture Portal
        </Link>
      </Container>
    </>
  );
}

export default PublicNotFound;
