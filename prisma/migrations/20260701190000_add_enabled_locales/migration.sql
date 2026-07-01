-- Admin-controlled locale visibility (HY, RU, EN, FR, PT)
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "enabledLocales" JSONB NOT NULL DEFAULT '["EN"]';
