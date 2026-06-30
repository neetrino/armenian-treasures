import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthBrand } from '@/components/auth/AuthBrand';
import { AuthCard, AuthCardIntro } from '@/components/auth/AuthCard';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { MemberRegisterForm } from '@/components/forms/MemberRegisterForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Register for an Armenian Treasures member account.',
  robots: { index: false, follow: false },
};

function RegisterPage() {
  return (
    <AuthPageShell>
      <AuthCard wide>
        <AuthBrand />
        <AuthCardIntro
          eyebrow="Join us"
          title="Create account"
          lead="Register to follow projects, save favourites, and stay connected with the foundation."
        />
        <MemberRegisterForm />
        <p className="auth-card-back">
          ←{' '}
          <Link href="/" className="auth-form-link">
            Back to home
          </Link>
        </p>
      </AuthCard>
    </AuthPageShell>
  );
}

export default RegisterPage;
