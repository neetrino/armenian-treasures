import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthBrand } from '@/components/auth/AuthBrand';
import { AuthCard, AuthCardIntro } from '@/components/auth/AuthCard';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { MemberLoginForm } from '@/components/forms/MemberLoginForm';
import { getMemberOrNull } from '@/lib/auth/member-session';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Armenian Treasures account.',
  robots: { index: false, follow: false },
};

async function LoginPage() {
  const [member, locale] = await Promise.all([getMemberOrNull(), getCurrentSiteLocale()]);
  if (member) redirect('/profile');

  return (
    <AuthPageShell>
      <AuthCard>
        <AuthBrand />
        <AuthCardIntro
          eyebrow={uiMessage(locale, 'memberAccess')}
          title={uiMessage(locale, 'signIn')}
          lead={uiMessage(locale, 'loginLead')}
        />
        <MemberLoginForm locale={locale} />
        <p className="auth-card-back">
          ←{' '}
          <Link href="/" className="auth-form-link">
            {uiMessage(locale, 'backToHome')}
          </Link>
        </p>
      </AuthCard>
    </AuthPageShell>
  );
}

export default LoginPage;
