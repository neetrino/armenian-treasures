import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthBrand } from '@/components/auth/AuthBrand';
import { AuthCard, AuthCardIntro } from '@/components/auth/AuthCard';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { MemberRegisterForm } from '@/components/forms/MemberRegisterForm';
import { getMemberOrNull } from '@/lib/auth/member-session';
import { firstQueryValue, safeReturnPath } from '@/lib/auth/safe-return-path';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Register for an Armenian Treasures member account.',
  robots: { index: false, follow: false },
};

async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const [member, locale, params] = await Promise.all([
    getMemberOrNull(),
    getCurrentSiteLocale(),
    searchParams,
  ]);
  const returnTo = safeReturnPath(firstQueryValue(params.next));
  if (member) redirect(returnTo ?? '/profile');

  return (
    <AuthPageShell>
      <AuthCard wide>
        <AuthBrand />
        <AuthCardIntro
          eyebrow={uiMessage(locale, 'joinUs')}
          title={uiMessage(locale, 'createAccount')}
          lead={uiMessage(locale, 'registerLead')}
        />
        <MemberRegisterForm locale={locale} returnTo={returnTo} />
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

export default RegisterPage;
