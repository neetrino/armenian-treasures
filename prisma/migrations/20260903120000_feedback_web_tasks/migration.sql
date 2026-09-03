-- Map pin taxonomy + map URL, blog article assets, about shortcuts, donation certificates.

CREATE TYPE "MapType_new" AS ENUM (
  'MONASTERY',
  'CHURCH',
  'CHAPEL',
  'FORTRESS',
  'SETTLEMENT',
  'MUSEUM',
  'MEMORIAL',
  'KHACHKAR',
  'OTHER'
);

ALTER TABLE "CultureItem" ALTER COLUMN "mapType" DROP DEFAULT;

ALTER TABLE "CultureItem"
  ALTER COLUMN "mapType" TYPE "MapType_new"
  USING (
    CASE "mapType"::text
      WHEN 'ARCHAEOLOGICAL' THEN 'OTHER'
      WHEN 'MONASTERY' THEN 'MONASTERY'
      WHEN 'CHURCH' THEN 'CHURCH'
      WHEN 'FORTRESS' THEN 'FORTRESS'
      WHEN 'MUSEUM' THEN 'MUSEUM'
      WHEN 'OTHER' THEN 'OTHER'
      ELSE NULL
    END
  )::"MapType_new";

DROP TYPE "MapType";
ALTER TYPE "MapType_new" RENAME TO "MapType";

ALTER TABLE "CultureItem" ADD COLUMN "mapUrl" TEXT;

ALTER TABLE "BlogPost" ADD COLUMN "headerImage" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "backgroundImage" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "galleryContent" JSONB;

ALTER TABLE "AboutContent" ADD COLUMN "missionShortcutImage" TEXT;
ALTER TABLE "AboutContent" ADD COLUMN "teamShortcutImage" TEXT;
ALTER TABLE "AboutContent" ADD COLUMN "careerShortcutImage" TEXT;
ALTER TABLE "AboutContent" ADD COLUMN "contactShortcutImage" TEXT;

ALTER TABLE "SiteSettings" ADD COLUMN "certificateGuardianUrl" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN "certificateAmbassadorUrl" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN "certificateMagistrUrl" TEXT;
