-- AlterTable
ALTER TABLE "HomeContent" ADD COLUMN "heroSubtitle" TEXT NOT NULL DEFAULT 'CULTURAL HERITAGE\nPORTAL';
ALTER TABLE "HomeContent" ADD COLUMN "heroTagline" TEXT NOT NULL DEFAULT 'BRINGING ARMENIAN HISTORY INTO THE DIGITAL FUTURE';
ALTER TABLE "HomeContent" ADD COLUMN "sections" JSONB;

-- CreateTable
CREATE TABLE "PageContent" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageContent_slug_key" ON "PageContent"("slug");
