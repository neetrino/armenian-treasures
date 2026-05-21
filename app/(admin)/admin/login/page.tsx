import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { AdminAuthForm } from '@/components/forms/AdminAuthForm';

export const metadata: Metadata = {
  title: 'Admin login',
  robots: { index: false, follow: false },
};

function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-parchment-200/40 p-6">
      <div className="w-full max-w-md rounded-2xl border border-stone-100 bg-white p-8 shadow-card">
        <Logo variant="on-light" />
        <div className="mt-8 flex flex-col gap-2">
          <p className="eyebrow">Foundation admin</p>
          <h1 className="font-display text-3xl text-ink">Sign in</h1>
          <p className="text-sm text-ink-soft">
            Use the admin credentials configured in your environment to access the panel.
          </p>
        </div>
        <div className="mt-6">
          <AdminAuthForm />
        </div>
        <p className="mt-6 text-xs text-ink-muted">
          ←{' '}
          <Link href="/" className="text-pomegranate hover:underline">
            Back to public site
          </Link>
        </p>
      </div>
    </main>
  );
}

export default AdminLoginPage;
