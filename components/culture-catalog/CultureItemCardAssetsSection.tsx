import Image from 'next/image';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

interface CultureItemCardAssetsSectionProps {
  title: string;
  image?: string | null;
  coverImage?: string | null;
  cardBackgroundColor?: string | null;
  cardBackgroundImage?: string | null;
}

interface AssetTile {
  key: string;
  label: string;
  src: string;
}

function collectImageTiles(props: CultureItemCardAssetsSectionProps): AssetTile[] {
  const tiles: AssetTile[] = [];
  const cover = props.coverImage?.trim();
  const card = props.image?.trim();
  const background = props.cardBackgroundImage?.trim();

  if (cover) {
    tiles.push({ key: 'cover', label: 'Cover image', src: cover });
  }
  if (card && card !== cover) {
    tiles.push({ key: 'card', label: 'Card photo', src: card });
  }
  if (background && background !== cover && background !== card) {
    tiles.push({ key: 'background', label: 'Card background', src: background });
  }
  return tiles;
}

export function CultureItemCardAssetsSection({
  title,
  image,
  coverImage,
  cardBackgroundColor,
  cardBackgroundImage,
}: CultureItemCardAssetsSectionProps) {
  const tiles = collectImageTiles({ title, image, coverImage, cardBackgroundColor, cardBackgroundImage });
  const color = cardBackgroundColor?.trim() ?? '';
  const hasColor = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(color);

  if (tiles.length === 0 && !hasColor) return null;

  return (
    <div className="catalog-item-media-block">
      <p className="sec-label">Visual Assets</p>
      <h2 className="sec-title">Card &amp; Cover</h2>
      <p className="sec-desc">Imagery configured for this entry in the catalog editor.</p>
      <div className="catalog-card-assets">
        {tiles.map((tile) => (
          <figure key={tile.key} className="catalog-card-assets__tile reveal">
            <div className="catalog-card-assets__media">
              <Image
                src={resolvePublicAssetUrl(tile.src)}
                alt={`${title} — ${tile.label}`}
                width={900}
                height={600}
              />
            </div>
            <figcaption className="catalog-card-assets__label">{tile.label}</figcaption>
          </figure>
        ))}
        {hasColor ? (
          <div className="catalog-card-assets__tile catalog-card-assets__tile--color reveal">
            <div
              className="catalog-card-assets__swatch"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            <p className="catalog-card-assets__label">Card background color</p>
            <p className="catalog-card-assets__value">{color}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
