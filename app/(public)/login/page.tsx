import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthBrand } from '@/components/auth/AuthBrand';
import { AuthCard, AuthCardIntro } from '@/components/auth/AuthCard';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { MemberLoginForm } from '@/components/forms/MemberLoginForm';
import { getMemberOrNull } from '@/lib/auth/member-session';
import { firstQueryValue, safeReturnPath } from '@/lib/auth/safe-return-path';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentSiteLocale();
  return {
    title: uiMessage(locale, 'loginMetaTitle'),
    description: uiMessage(locale, 'loginMetaDescription'),
    robots: { index: false, follow: false },
  };
}

async function LoginPage({
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
      <AuthCard>
        <AuthBrand />
        <AuthCardIntro
          eyebrow={uiMessage(locale, 'memberAccess')}
          title={uiMessage(locale, 'signIn')}
          lead={uiMessage(locale, 'loginLead')}
        />
        <MemberLoginForm locale={locale} returnTo={returnTo} />
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
