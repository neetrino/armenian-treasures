import type { Metadata } from 'next';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { MemberProfileShell } from '@/components/profile/MemberProfileShell';
import { requireMemberPage } from '@/lib/auth/member-session';
import { getMemberDonations } from '@/lib/queries/member-donations';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Profile',
  robots: { index: false, follow: false },
};

async function ProfilePage() {
  const member = await requireMemberPage();
  const donations = await getMemberDonations(member.id);

  return (
    <AuthPageShell>
      <AuthCard wide profile>
        <MemberProfileShell member={member} donations={donations} />
      </AuthCard>
    </AuthPageShell>
  );
}

export default ProfilePage;
