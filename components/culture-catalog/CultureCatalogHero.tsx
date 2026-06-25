import Link from 'next/link';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { CULTURE_CATALOG_DEFAULT_HERO_IMAGE } from '@/lib/constants/culture-catalog-content';
import { CultureCatalogBreadcrumb, type CultureCatalogBreadcrumbSegment } from '@/components/culture-catalog/CultureCatalogBreadcrumb';

export interface CultureCatalogHeroCta {
  label: string;
  href: string;
  variant: 'gold' | 'teal' | 'outline';
}

interface CultureCatalogHeroProps {
  title: string;
  eyebrow: string;
  accent: string;
  slogan: string;
  description: string;
  breadcrumb: CultureCatalogBreadcrumbSegment[];
  heroImage?: string;
  ctas?: CultureCatalogHeroCta[];
  showScroll?: boolean;
}

const CTA_CLASS: Record<CultureCatalogHeroCta['variant'], string> = {
  gold: 'btn-gold',
  teal: 'btn-teal',
  outline: 'btn-outline',
};

function HeroCta({ cta }: { cta: CultureCatalogHeroCta }) {
  const className = CTA_CLASS[cta.variant];
  const isHash = cta.href.startsWith('#');
  if (isHash) {
    return (
      <a href={cta.href} className={className}>
        {cta.label}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export function CultureCatalogHero({
  title,
  eyebrow,
  accent,
  slogan,
  description,
  breadcrumb,
  heroImage = CULTURE_CATALOG_DEFAULT_HERO_IMAGE,
  ctas = [],
  showScroll = true,
}: CultureCatalogHeroProps) {
  const imageUrl = resolvePublicAssetUrl(heroImage);

  return (
    <div className="hero culture-catalog-hero">
      <CultureCatalogBreadcrumb segments={breadcrumb} />
      <div
        className="hero-img-overlay"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(9,9,9,.88) 0%,rgba(9,9,9,.38) 40%,rgba(9,9,9,.82) 100%),url('${imageUrl}')`,
        }}
      />
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div
        className="hero-bloom"
        style={{
          width: 700,
          height: 700,
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          ['--bd' as string]: '8s',
        }}
      />
      <div
        className="hero-bloom"
        style={{
          width: 380,
          height: 380,
          bottom: 0,
          left: '5%',
          ['--bd' as string]: '6s',
          ['--bdelay' as string]: '2s',
        }}
      />
      <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
      </svg>
      <div className="hero-content">
        <p className="hero-eyebrow reveal">{eyebrow}</p>
        <h1 className="reveal">
          {title}
          <span>{accent}</span>
        </h1>
        <p className="hero-slogan reveal">{slogan}</p>
        <p className="hero-sub reveal">{description}</p>
        {ctas.length > 0 ? (
          <div className="hero-btns reveal">
            {ctas.map((cta) => (
              <HeroCta key={cta.href + cta.label} cta={cta} />
            ))}
          </div>
        ) : null}
      </div>
      {showScroll ? (
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      ) : null}
    </div>
  );
}
