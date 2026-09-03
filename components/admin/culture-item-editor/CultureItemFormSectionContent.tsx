'use client';

import type { ReactNode } from 'react';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { CultureItemBasicsFields } from '@/components/admin/culture-item-editor/CultureItemBasicsFields';
import { CultureItemCardBackgroundFields } from '@/components/admin/CultureItemCardBackgroundFields';
import { CultureItemDescriptionBlocksField } from '@/components/admin/culture-item-editor/CultureItemDescriptionBlocksField';
import { CultureItemGalleryBlocksField } from '@/components/admin/culture-item-editor/CultureItemGalleryBlocksField';
import { CultureItemToursField } from '@/components/admin/culture-item-editor/CultureItemToursField';
import { CultureItemVideosField } from '@/components/admin/culture-item-editor/CultureItemVideosField';
import { AdminLocationMapField } from '@/components/admin/culture-item-editor/AdminLocationMapField';
import { CultureItemEditorSection } from '@/components/admin/culture-item-editor/CultureItemEditorSection';
import type { CultureItemEditorSectionId } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';
import type { CultureItemMediaContent } from '@/lib/culture-item-media';

interface CultureItemFormSectionContentProps {
  sectionId: CultureItemEditorSectionId;
  initial?: CultureItemFormInitial;
  fieldErrors?: Record<string, string>;
  media: CultureItemMediaContent;
  mapUrl: string;
  onMediaChange: (patch: Partial<CultureItemMediaContent>) => void;
  onMapUrlChange: (value: string) => void;
}

export function CultureItemFormSectionContent({
  sectionId,
  initial,
  fieldErrors,
  media,
  mapUrl,
  onMediaChange,
  onMapUrlChange,
}: CultureItemFormSectionContentProps): ReactNode {
  switch (sectionId) {
    case 'card-image':
      return (
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminImageDropzoneField
              label="Card photo"
              name="image"
              folder="culture"
              layout="card"
              defaultValue={initial?.image ?? ''}
              hint="Shown on catalog cards."
              error={fieldErrors?.image}
            />
            <AdminImageDropzoneField
              label="Cover image"
              name="coverImage"
              folder="culture"
              layout="banner"
              defaultValue={initial?.coverImage ?? ''}
              hint="Hero / cover on the article page."
              error={fieldErrors?.coverImage}
            />
          </div>
          <CultureItemCardBackgroundFields
            colorDefaultValue={initial?.cardBackgroundColor ?? ''}
            imageDefaultValue={initial?.cardBackgroundImage ?? ''}
            colorError={fieldErrors?.cardBackgroundColor}
            imageError={fieldErrors?.cardBackgroundImage}
          />
        </div>
      );
    case 'description':
      return (
        <CultureItemDescriptionBlocksField
          blocks={media.blocks}
          onChange={(blocks) => onMediaChange({ blocks })}
        />
      );
    case 'map':
      return (
        <AdminLocationMapField
          locationName={initial?.locationName}
          address={media.address}
          mapUrl={mapUrl}
          mapType={initial?.mapType}
          showOnMap={initial?.showOnMap}
          fieldErrors={fieldErrors}
          onMapUrlChange={onMapUrlChange}
        />
      );
    case 'tours':
      return (
        <CultureItemToursField
          tours={media.tours}
          onChange={(tours) => onMediaChange({ tours })}
        />
      );
    case 'videos':
      return (
        <CultureItemVideosField
          videos={media.videos}
          onChange={(videos) => onMediaChange({ videos })}
        />
      );
    case 'gallery':
      return (
        <CultureItemGalleryBlocksField
          items={media.gallery}
          onChange={(gallery) => onMediaChange({ gallery })}
        />
      );
    default:
      return null;
  }
}

interface CultureItemFormBasicsSectionProps {
  initial?: CultureItemFormInitial;
  fieldErrors?: Record<string, string>;
  forceOpen?: boolean;
}

export function CultureItemFormBasicsSection({
  initial,
  fieldErrors,
  forceOpen = false,
}: CultureItemFormBasicsSectionProps) {
  return (
    <CultureItemEditorSection
      title="Catalog metadata"
      description="Slug, region, and sort order."
      defaultOpen={forceOpen}
      forceOpen={forceOpen}
    >
      <CultureItemBasicsFields initial={initial} fieldErrors={fieldErrors} />
    </CultureItemEditorSection>
  );
}
