import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthBrand } from '@/components/auth/AuthBrand';
import { AuthCard, AuthCardIntro } from '@/components/auth/AuthCard';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { MemberLoginForm } from '@/components/forms/MemberLoginForm';
import { getMemberOrNull } from '@/lib/auth/member-session';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Armenian Treasures account.',
  robots: { index: false, follow: false },
};

async function LoginPage() {
  const member = await getMemberOrNull();
  if (member) redirect('/profile');

  return (
    <AuthPageShell>
      <AuthCard>
        <AuthBrand />
        <AuthCardIntro
          eyebrow="Member access"
          title="Sign in"
          lead="Use your email and password to access your account."
        />
        <MemberLoginForm />
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

export default LoginPage;
