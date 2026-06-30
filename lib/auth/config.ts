import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { headers } from 'next/headers';
import { adminLoginSchema, memberLoginSchema } from '@/lib/validation';
import {
  extractClientIp,
  getAdminLoginRateLimiter,
  getMemberLoginRateLimiter,
} from '@/lib/rate-limit';
import {
  checkLoginEnvVars,
  logLoginError,
  LOGIN_LOG_PREFIX,
} from './login-debug';
import { LoginCredentialsSignin } from './login-credentials-signin';
import { validateAdminCredentials } from './validate-admin-credentials';
import { validateMemberCredentials } from './validate-member-credentials';

export type AuthRole = 'ADMIN' | 'MEMBER';

declare module 'next-auth' {
  interface User {
    role?: AuthRole;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role?: AuthRole;
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
      id: 'admin',
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(raw) {
        console.log(`${LOGIN_LOG_PREFIX} authorize: admin credentials sign-in started`);

        const envIssue = checkLoginEnvVars();
        if (envIssue) {
          throw new LoginCredentialsSignin(envIssue);
        }

        try {
          const parsed = adminLoginSchema.safeParse(raw);
          if (!parsed.success) {
            console.error(`${LOGIN_LOG_PREFIX} authorize: schema validation failed`);
            throw new LoginCredentialsSignin({
              error: 'VALIDATION_FAILED',
              details: parsed.error.message,
            });
          }

          const headerStore = await headers();
          const ipAddress = extractClientIp(headerStore);
          const userAgent = headerStore.get('user-agent') ?? undefined;
          const normalizedEmail = parsed.data.email.trim().toLowerCase();
          console.log(`${LOGIN_LOG_PREFIX} authorize: rate limit check for email=${normalizedEmail}`);

          const limiter = getAdminLoginRateLimiter();
          const rateKey = `login:${normalizedEmail}:${ipAddress}`;
          const rateCheck = await limiter.check(rateKey);
          if (!rateCheck.allowed) {
            console.error(`${LOGIN_LOG_PREFIX} authorize: rate limited`);
            throw new Error('RATE_LIMITED');
          }

          const result = await validateAdminCredentials(parsed.data.email, parsed.data.password, {
            ipAddress,
            userAgent,
          });
          if (!result.success) {
            throw new LoginCredentialsSignin(result.debug);
          }

          console.log(`${LOGIN_LOG_PREFIX} authorize: success userId=${result.adminUser.id}`);
          return {
            id: result.adminUser.id,
            name: result.adminUser.email,
            email: result.adminUser.email,
            role: 'ADMIN' as const,
          };
        } catch (error) {
          if (error instanceof LoginCredentialsSignin || (error instanceof Error && error.message === 'RATE_LIMITED')) {
            throw error;
          }
          logLoginError('authorize: unexpected error', error);
          throw new LoginCredentialsSignin({
            error: 'UNKNOWN_ERROR',
            details: error instanceof Error ? error.message : String(error),
          });
        }
      },
    }),
    Credentials({
      id: 'member',
      name: 'Member',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(raw) {
        const parsed = memberLoginSchema.safeParse(raw);
        if (!parsed.success) {
          return null;
        }

        const headerStore = await headers();
        const ipAddress = extractClientIp(headerStore);
        const normalizedEmail = parsed.data.email.trim().toLowerCase();
        const rateCheck = await getMemberLoginRateLimiter().check(
          `member-login:${normalizedEmail}:${ipAddress}`,
        );
        if (!rateCheck.allowed) {
          throw new Error('RATE_LIMITED');
        }

        const result = await validateMemberCredentials(parsed.data.email, parsed.data.password);
        if (!result.success) {
          return null;
        }

        const { member } = result;
        return {
          id: member.id,
          name: `${member.name} ${member.surname}`,
          email: member.email,
          role: 'MEMBER' as const,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typed = user as { id?: string; role?: AuthRole };
        if (typed.id) token.sub = typed.id;
        if (typed.role) (token as Record<string, unknown>).role = typed.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        if (token.sub) session.user.id = token.sub;
        const role = (token as Record<string, unknown>).role;
        if (role === 'ADMIN' || role === 'MEMBER') {
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
      if (isAdminArea || isAdminApi) {
        return auth?.user?.role === 'ADMIN';
      }
      return true;
    },
  },
};

export { isRateLimitAuthError } from './rate-limit-error';
