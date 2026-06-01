import { ButtonLink } from '@/components/ui/Button';
import { isMatterportUrl } from '@/lib/matterport';

interface CultureItemTourSectionProps {
  title: string;
  tourUrl: string;
}

export function CultureItemTourSection({ title, tourUrl }: CultureItemTourSectionProps) {
  const embedMatterport = isMatterportUrl(tourUrl);
  const sectionTitle = embedMatterport ? 'Matterport 3D Tour' : '3D Tour';

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl text-ink">{sectionTitle}</h2>
      {embedMatterport ? (
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-stone-100 bg-black shadow-card">
          <iframe
            src={tourUrl}
            title={`${title} 3D Tour`}
            className="h-full w-full border-0"
            allow="fullscreen; xr-spatial-tracking"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}
      <div>
        <ButtonLink href={tourUrl} variant="secondary" external withArrow>
          Open 3D Tour
        </ButtonLink>
      </div>
    </section>
  );
}
