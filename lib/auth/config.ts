import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { adminLoginSchema } from '@/lib/validation';

export type AdminRole = 'ADMIN' | 'EDITOR';

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
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role };
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
        if (role === 'ADMIN' || role === 'EDITOR') {
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
