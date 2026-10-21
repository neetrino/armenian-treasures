import { getSiteUrl } from '@/lib/site-url';

export function facebookShareUrl(pathname: string, origin = getSiteUrl()): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${origin}${path}`)}`;
}
