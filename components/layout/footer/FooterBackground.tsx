import { FooterConstellation } from '@/components/layout/footer/FooterConstellation';

export function FooterBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-brand-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_50%,rgba(200,132,61,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_40%,rgba(30,42,94,0.35),transparent_60%)]" />
      <FooterConstellation className="absolute -left-16 top-1/2 h-[min(70vw,22rem)] w-[min(70vw,22rem)] -translate-y-1/2 opacity-90 sm:-left-8 lg:h-[26rem] lg:w-[26rem]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(8,4,12,0.15)_100%)]" />
    </div>
  );
}
