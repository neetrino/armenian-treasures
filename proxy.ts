import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth/config';

export const { auth: proxy } = NextAuth(authConfig);

export const config = {
  matcher: [
    '/admin',
    // Protect admin panel routes but not /admin/login (including login server-action POSTs).
    '/admin/((?!login$).*)',
    '/api/admin/:path*',
  ],
};

export default proxy;
