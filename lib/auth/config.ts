import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { headers } from 'next/headers';
import { adminLoginSchema } from '@/lib/validation';
import {
  extractClientIp,
  getAdminLoginRateLimiter,
} from '@/lib/rate-limit';
import { getAdminEnvDiagnostics, logAdminAuthDiagnostics } from './admin-env-credentials';
import { validateAdminCredentials } from './validate-admin-credentials';

export type AdminRole = 'ADMIN';

declare module 'next-auth' {
  interface User {
    role?: AdminRole;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: AdminRole;
    };
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/admin/login',
  },
  session: { strategy: 'jwt' },
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(raw) {
        const parsed = adminLoginSchema.safeParse(raw);
        if (!parsed.success) return null;

        const headerStore = await headers();
        const ipAddress = extractClientIp(headerStore);
        const userAgent = headerStore.get('user-agent') ?? undefined;
        const normalizedEmail = parsed.data.email.trim().toLowerCase();
        const configuredEnvEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

        logAdminAuthDiagnostics({
          stage: 'authorize',
          ...getAdminEnvDiagnostics(),
          submittedEmailLength: parsed.data.email.trim().length,
          submittedPasswordLength: parsed.data.password.length,
          normalizedEmailMatchesEnv: configuredEnvEmail
            ? configuredEnvEmail === normalizedEmail
            : false,
          hasDatabaseUrl: Boolean(process.env.DATABASE_URL?.trim()),
        });

        const limiter = getAdminLoginRateLimiter();
        const rateKey = `login:${normalizedEmail}:${ipAddress}`;
        const rateCheck = await limiter.check(rateKey);
        if (!rateCheck.allowed) {
          throw new Error('RATE_LIMITED');
        }

        const result = await validateAdminCredentials(parsed.data.email, parsed.data.password, {
          ipAddress,
          userAgent,
        });
        if (!result.success) {
          logAdminAuthDiagnostics({ stage: 'authorize', outcome: 'rejected' });
          return null;
        }

        logAdminAuthDiagnostics({
          stage: 'authorize',
          outcome: 'accepted',
          adminUserIdLength: result.adminUser.id.length,
        });

        return {
          id: result.adminUser.id,
          name: 'Foundation Admin',
          email: result.adminUser.email,
          role: 'ADMIN' as const,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typed = user as { id?: string; role?: AdminRole };
        if (typed.id) token.sub = typed.id;
        if (typed.role) (token as Record<string, unknown>).role = typed.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        if (token.sub) session.user.id = token.sub;
        const role = (token as Record<string, unknown>).role;
        if (role === 'ADMIN') {
          session.user.role = role;
        }
      }
      return session;
    },
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const isAdminArea =
        pathname.startsWith('/admin') && pathname !== '/admin/login';
      const isAdminApi = pathname.startsWith('/api/admin');
      if (isAdminArea || isAdminApi) return Boolean(auth?.user);
      return true;
    },
  },
};

export { isRateLimitAuthError } from './rate-limit-error';
