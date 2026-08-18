'use client';

import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { TextField } from '@/components/forms/fields/TextField';
import {
  RepeatableFieldCard,
  RepeatableFieldList,
} from '@/components/admin/culture-item-editor/RepeatableFieldList';
import { emptyVideoBlock, type CultureVideoBlock } from '@/lib/culture-item-media';

interface CultureItemVideosFieldProps {
  videos: CultureVideoBlock[];
  onChange: (videos: CultureVideoBlock[]) => void;
}

function patchVideo(
  videos: CultureVideoBlock[],
  index: number,
  patch: Partial<CultureVideoBlock>,
): CultureVideoBlock[] {
  return videos.map((item, current) => (current === index ? { ...item, ...patch } : item));
}

export function CultureItemVideosField({ videos, onChange }: CultureItemVideosFieldProps) {
  return (
    <>
      <input type="hidden" name="videosCount" value={videos.length} />
      <RepeatableFieldList addLabel="Add video" onAdd={() => onChange([...videos, emptyVideoBlock()])}>
        {videos.map((video, index) => {
          const prefix = `video.${index}`;
          return (
            <RepeatableFieldCard
              key={video.id}
              title={`Video ${index + 1}`}
              onRemove={() => onChange(videos.filter((_, current) => current !== index))}
            >
              <input type="hidden" name={`${prefix}.id`} value={video.id} />
              <TextField
                label="Title"
                name={`${prefix}.title`}
                value={video.title}
                onChange={(event) => onChange(patchVideo(videos, index, { title: event.target.value }))}
              />
              <TextField
                label="MP4, YouTube, or Vimeo URL"
                name={`${prefix}.url`}
                value={video.url}
                onChange={(event) => onChange(patchVideo(videos, index, { url: event.target.value }))}
                hint="Paste a hosted MP4 or an embeddable YouTube / Vimeo link."
              />
              <AdminImageDropzoneField
                label="Preview image"
                name={`${prefix}.previewImage`}
                folder="culture"
                layout="card"
                value={video.previewImage}
                onValueChange={(previewImage) => onChange(patchVideo(videos, index, { previewImage }))}
              />
            </RepeatableFieldCard>
          );
        })}
      </RepeatableFieldList>
    </>
  );
}
