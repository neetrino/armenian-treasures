'use client';

import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { TextField } from '@/components/forms/fields/TextField';
import { SelectField } from '@/components/forms/fields/SelectField';
import {
  RepeatableFieldCard,
  RepeatableFieldList,
} from '@/components/admin/culture-item-editor/RepeatableFieldList';
import { emptyTourBlock, TOUR_TYPE_OPTIONS, type CultureTourBlock } from '@/lib/culture-item-media';

interface CultureItemToursFieldProps {
  tours: CultureTourBlock[];
  onChange: (tours: CultureTourBlock[]) => void;
}

function patchTour(
  tours: CultureTourBlock[],
  index: number,
  patch: Partial<CultureTourBlock>,
): CultureTourBlock[] {
  return tours.map((item, current) => (current === index ? { ...item, ...patch } : item));
}

export function CultureItemToursField({ tours, onChange }: CultureItemToursFieldProps) {
  return (
    <>
      <input type="hidden" name="toursCount" value={tours.length} />
      <RepeatableFieldList addLabel="Add virtual tour" onAdd={() => onChange([...tours, emptyTourBlock()])}>
        {tours.map((tour, index) => {
          const prefix = `tour.${index}`;
          return (
            <RepeatableFieldCard
              key={tour.id}
              title={`Tour ${index + 1}`}
              onRemove={() => onChange(tours.filter((_, current) => current !== index))}
            >
              <input type="hidden" name={`${prefix}.id`} value={tour.id} />
              <SelectField
                label="Type"
                name={`${prefix}.type`}
                options={[...TOUR_TYPE_OPTIONS]}
                value={tour.type}
                onChange={(event) => onChange(patchTour(tours, index, { type: event.target.value as CultureTourBlock['type'] }))}
              />
              <TextField
                label="Title"
                name={`${prefix}.title`}
                value={tour.title}
                onChange={(event) => onChange(patchTour(tours, index, { title: event.target.value }))}
              />
              <TextField
                label="Iframe or link"
                name={`${prefix}.url`}
                type="url"
                value={tour.url}
                onChange={(event) => onChange(patchTour(tours, index, { url: event.target.value }))}
              />
              <AdminImageDropzoneField
                label="Preview image"
                name={`${prefix}.previewImage`}
                folder="culture"
                layout="card"
                value={tour.previewImage}
                onValueChange={(previewImage) => onChange(patchTour(tours, index, { previewImage }))}
              />
            </RepeatableFieldCard>
          );
        })}
      </RepeatableFieldList>
    </>
  );
}
