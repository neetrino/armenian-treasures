'use client';

import { useState } from 'react';
import { HandCoins, LogOut, UserPen } from 'lucide-react';
import type { MemberContext } from '@/lib/auth/member-session';
import type { MemberDonationRecord } from '@/lib/queries/member-donations';
import { MemberProfileForm } from '@/components/forms/MemberProfileForm';
import { MemberDonationHistory } from '@/components/profile/MemberDonationHistory';
import { signOutMemberAction } from '@/app/(public)/profile/actions';
import { cn } from '@/lib/utils';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

type ProfileTab = 'details' | 'donations';

interface MemberProfileShellProps {
  member: MemberContext;
  donations: MemberDonationRecord[];
  locale?: SiteLocaleCode;
}

function memberInitials(name: string, surname: string): string {
  const first = name.trim().charAt(0);
  const last = surname.trim().charAt(0);
  return `${first}${last}`.toUpperCase() || 'AT';
}

export function MemberProfileShell({
  member,
  donations,
  locale = 'EN',
}: MemberProfileShellProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('details');
  const tabs = [
    { id: 'details', label: uiMessage(locale, 'personalDetails'), icon: UserPen },
    { id: 'donations', label: uiMessage(locale, 'donationHistory'), icon: HandCoins },
  ] satisfies { id: ProfileTab; label: string; icon: typeof UserPen }[];

  return (
    <div className="auth-profile-layout">
      <aside className="auth-profile-sidebar" aria-label={uiMessage(locale, 'profileSections')}>
        <div className="auth-profile-sidebar__panel">
          <div aria-hidden className="auth-profile-sidebar__glow" />

          <div className="auth-profile-sidebar__user">
            <div className="auth-profile-sidebar__avatar" aria-hidden>
              {memberInitials(member.name, member.surname)}
            </div>
            <div className="auth-profile-sidebar__identity">
              <p className="auth-profile-sidebar__eyebrow">{uiMessage(locale, 'memberAccount')}</p>
              <p className="auth-profile-sidebar__name" title={`${member.name} ${member.surname}`}>
                {member.name} {member.surname}
              </p>
              <p className="auth-profile-sidebar__email" title={member.email}>
                {member.email}
              </p>
            </div>
          </div>

          <div aria-hidden className="auth-profile-sidebar__divider">
            <span className="auth-profile-sidebar__divider-line" />
            <span className="auth-profile-sidebar__divider-gem" />
            <span className="auth-profile-sidebar__divider-line" />
          </div>

          <div className="auth-profile-nav" role="navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn('auth-profile-nav__item', isActive && 'auth-profile-nav__item--active')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="auth-profile-nav__icon">
                    <Icon size={15} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="auth-profile-nav__label">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <form action={signOutMemberAction} className="auth-profile-sidebar__signout">
            <button type="submit" className="auth-profile-sidebar__signout-btn">
              <LogOut size={14} strokeWidth={1.75} aria-hidden />
              {uiMessage(locale, 'signOut')}
            </button>
          </form>
        </div>
      </aside>

      <div className="auth-profile-main">
        <section className="auth-profile-panel" aria-labelledby="profile-panel-heading">
          <p id="profile-panel-heading" className="auth-profile-panel__lead">
            {activeTab === 'details'
              ? uiMessage(locale, 'updateAccountLead')
              : uiMessage(locale, 'reviewSupportLead')}
          </p>

          {activeTab === 'details' ? (
            <MemberProfileForm member={member} locale={locale} />
          ) : (
            <MemberDonationHistory donations={donations} locale={locale} />
          )}
        </section>
      </div>
    </div>
  );
}
