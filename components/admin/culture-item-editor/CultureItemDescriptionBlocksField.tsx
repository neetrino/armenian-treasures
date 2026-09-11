'use client';

import { TextField } from '@/components/forms/fields/TextField';
import { RichTextField } from '@/components/forms/fields/RichTextField';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import {
  RepeatableFieldCard,
  RepeatableFieldList,
} from '@/components/admin/culture-item-editor/RepeatableFieldList';
import {
  emptyDescriptionBlock,
  type CultureDescriptionBlock,
} from '@/lib/culture-item-media';

interface CultureItemDescriptionBlocksFieldProps {
  blocks: CultureDescriptionBlock[];
  onChange: (blocks: CultureDescriptionBlock[]) => void;
}

export function CultureItemDescriptionBlocksField({
  blocks,
  onChange,
}: CultureItemDescriptionBlocksFieldProps) {
  return (
    <>
      <input type="hidden" name="blocksCount" value={blocks.length} />
      <RepeatableFieldList
        addLabel="Add description block"
        onAdd={() => onChange([...blocks, emptyDescriptionBlock()])}
      >
        {blocks.map((block, index) => {
          const prefix = `block.${index}`;
          return (
            <RepeatableFieldCard
              key={block.id}
              title={`Description block ${index + 1}`}
              onRemove={() => onChange(blocks.filter((_, current) => current !== index))}
              onDuplicate={() => {
                const copy = {
                  ...block,
                  ...emptyDescriptionBlock(),
                  title: block.title,
                  subtitle: block.subtitle,
                  body: block.body,
                  image: block.image,
                  caption: block.caption,
                };
                onChange([...blocks.slice(0, index + 1), copy, ...blocks.slice(index + 1)]);
              }}
            >
              <input type="hidden" name={`${prefix}.id`} value={block.id} />
              <div className="grid gap-5 lg:grid-cols-[minmax(160px,240px)_minmax(0,1fr)]">
                <AdminImageDropzoneField
                  label="Side image"
                  name={`${prefix}.image`}
                  folder="culture"
                  layout="card"
                  value={block.image}
                  onValueChange={(image) =>
                    onChange(
                      blocks.map((item, current) =>
                        current === index ? { ...item, image } : item,
                      ),
                    )
                  }
                  hint="Shown to the left of the description on the public page."
                />
                <div className="flex flex-col gap-4">
                  <TextField
                    label="Title"
                    name={`${prefix}.title`}
                    value={block.title}
                    onChange={(event) =>
                      onChange(
                        blocks.map((item, current) =>
                          current === index ? { ...item, title: event.target.value } : item,
                        ),
                      )
                    }
                  />
                  <TextField
                    label="Subtitle"
                    name={`${prefix}.subtitle`}
                    value={block.subtitle}
                    onChange={(event) =>
                      onChange(
                        blocks.map((item, current) =>
                          current === index ? { ...item, subtitle: event.target.value } : item,
                        ),
                      )
                    }
                  />
                  <RichTextField
                    label="Text"
                    name={`${prefix}.body`}
                    compact
                    value={block.body}
                    onValueChange={(body) =>
                      onChange(
                        blocks.map((item, current) =>
                          current === index ? { ...item, body } : item,
                        ),
                      )
                    }
                    hint="Select text and use Bold, Italic, or lists."
                  />
                </div>
              </div>
            </RepeatableFieldCard>
          );
        })}
      </RepeatableFieldList>
    </>
  );
}
