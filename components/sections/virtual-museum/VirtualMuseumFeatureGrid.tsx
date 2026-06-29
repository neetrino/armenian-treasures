import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { VirtualMuseumCard } from '@/components/sections/virtual-museum/VirtualMuseumCard';
import { VIRTUAL_MUSEUM_GRID_CLASS } from '@/components/sections/virtual-museum/virtual-museum-grid-styles';

export function VirtualMuseumFeatureGrid({ home }: HomeSectionContentProps) {
  const features = getHomeSections(home).virtualMuseum.features;

  return (
    <Stagger className="relative z-10 w-full overflow-visible bg-transparent">
      <div className={VIRTUAL_MUSEUM_GRID_CLASS}>
        {features.map((feature) => (
          <StaggerItem key={feature.number} className="h-full overflow-visible">
            <VirtualMuseumCard {...feature} className="h-full min-h-full" />
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}
