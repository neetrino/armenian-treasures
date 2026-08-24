'use client';

import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
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
      <RepeatableFieldList addLabel="Add description block" onAdd={() => onChange([...blocks, emptyDescriptionBlock()])}>
        {blocks.map((block, index) => {
          const prefix = `block.${index}`;
          return (
            <RepeatableFieldCard
              key={block.id}
              title={`Description block ${index + 1}`}
              onRemove={() => onChange(blocks.filter((_, current) => current !== index))}
              onDuplicate={() => {
                const copy = { ...block, ...emptyDescriptionBlock(), title: block.title, subtitle: block.subtitle, body: block.body, image: block.image, caption: block.caption };
                onChange([...blocks.slice(0, index + 1), copy, ...blocks.slice(index + 1)]);
              }}
            >
              <input type="hidden" name={`${prefix}.id`} value={block.id} />
              <TextField
                label="Title"
                name={`${prefix}.title`}
                value={block.title}
                onChange={(event) =>
                  onChange(blocks.map((item, current) => (current === index ? { ...item, title: event.target.value } : item)))
                }
              />
              <TextField
                label="Subtitle"
                name={`${prefix}.subtitle`}
                value={block.subtitle}
                onChange={(event) =>
                  onChange(
                    blocks.map((item, current) => (current === index ? { ...item, subtitle: event.target.value } : item)),
                  )
                }
              />
              <TextareaField
                label="Text"
                name={`${prefix}.body`}
                rows={6}
                value={block.body}
                onChange={(event) =>
                  onChange(blocks.map((item, current) => (current === index ? { ...item, body: event.target.value } : item)))
                }
                hint="Line breaks are kept on the public page."
              />
              <AdminImageDropzoneField
                label="Block image"
                name={`${prefix}.image`}
                folder="culture"
                layout="card"
                value={block.image}
                onValueChange={(image) =>
                  onChange(blocks.map((item, current) => (current === index ? { ...item, image } : item)))
                }
              />
              <TextField
                label="Image caption"
                name={`${prefix}.caption`}
                value={block.caption}
                onChange={(event) =>
                  onChange(
                    blocks.map((item, current) => (current === index ? { ...item, caption: event.target.value } : item)),
                  )
                }
              />
            </RepeatableFieldCard>
          );
        })}
      </RepeatableFieldList>
    </>
  );
}
