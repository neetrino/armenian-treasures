ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "featuredOnHome" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "featuredOrder" INTEGER;

CREATE INDEX IF NOT EXISTS "BlogPost_featuredOnHome_featuredOrder_idx" ON "BlogPost"("featuredOnHome", "featuredOrder");

UPDATE "BlogPost" AS post
SET
  "featuredOnHome" = true,
  "featuredOrder" = ranked.rn
FROM (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY "publishedAt" DESC, "createdAt" DESC) AS rn
  FROM "BlogPost"
  WHERE "isPublished" = true
) AS ranked
WHERE post.id = ranked.id
  AND ranked.rn <= 5;
