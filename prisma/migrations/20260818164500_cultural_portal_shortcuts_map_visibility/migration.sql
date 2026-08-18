UPDATE "PageContent"
SET content = jsonb_set(content, '{sectionVisibility}', '{
  "hero": false,
  "stats": false,
  "categories": true,
  "highlights": false,
  "map": true,
  "projects": false,
  "partnership": false,
  "donors": false,
  "about": false
}'::jsonb, true)
WHERE slug = 'cultural-portal-page';

UPDATE "PageContent"
SET content = jsonb_set(
  content,
  '{values}',
  (
    SELECT jsonb_object_agg(
      locale.key,
      CASE
        WHEN jsonb_typeof(locale.value) = 'object'
          THEN jsonb_set(
            locale.value,
            '{sectionVisibility}',
            '{
              "hero": false,
              "stats": false,
              "categories": true,
              "highlights": false,
              "map": true,
              "projects": false,
              "partnership": false,
              "donors": false,
              "about": false
            }'::jsonb,
            true
          )
        ELSE locale.value
      END
    )
    FROM jsonb_each(content -> 'values') AS locale(key, value)
  ),
  true
)
WHERE slug = 'cultural-portal-page'
  AND jsonb_typeof(content -> 'values') = 'object';
