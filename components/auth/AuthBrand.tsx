import Image from 'next/image';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

const HEADER_LOGO_SRC = resolvePublicAssetUrl('/images/brand/header-logo.webp');

export function AuthBrand() {
  return (
    <div className="auth-card-brand-wrap">
      <div className="auth-card-brand" aria-hidden>
        <Image
          src={HEADER_LOGO_SRC}
          alt=""
          width={700}
          height={923}
          className="auth-card-brand__mark"
          priority
        />
      </div>
    </div>
  );
}
