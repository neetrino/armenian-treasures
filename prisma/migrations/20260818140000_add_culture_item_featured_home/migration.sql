ALTER TABLE "CultureItem" ADD COLUMN IF NOT EXISTS "featuredOnHome" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "CultureItem" ADD COLUMN IF NOT EXISTS "featuredOrder" INTEGER;

CREATE INDEX IF NOT EXISTS "CultureItem_featuredOnHome_featuredOrder_idx" ON "CultureItem"("featuredOnHome", "featuredOrder");

UPDATE "CultureItem" AS item
SET
  "featuredOnHome" = true,
  "featuredOrder" = ranked.rn
FROM (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY "order" ASC, "createdAt" DESC) AS rn
  FROM "CultureItem"
  WHERE status = 'PUBLISHED'
) AS ranked
WHERE item.id = ranked.id
  AND ranked.rn <= 5;
