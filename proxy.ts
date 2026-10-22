import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

function isAdmin(role: string | undefined): boolean {
  return role === 'ADMIN';
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === '/admin/login';
  const isAdminApi = pathname.startsWith('/api/admin');
  const needsAdmin = (pathname.startsWith('/admin') && !isLogin) || isAdminApi;

  if (needsAdmin && !isAdmin(req.auth?.user?.role)) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = '/admin/login';
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next({ request: req });
});

export const config = {
  matcher: ['/admin/:path*', '/api/admin/((?!uploads/put).*)'],
};
