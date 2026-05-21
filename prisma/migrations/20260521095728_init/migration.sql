-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('SUBCATEGORY_REQUEST', 'PROJECT_REQUEST', 'CULTURE_ITEM_REQUEST', 'GENERAL_REQUEST');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'READ', 'REPLIED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CultureItemType" AS ENUM ('MONUMENT', 'MUSEUM', 'PERSON', 'LEGEND', 'HISTORY_EVENT', 'HERITAGE_OBJECT', 'PUBLICATION', 'MUSIC', 'FOOD', 'DANCE', 'THEATRE', 'OTHER');

-- CreateEnum
CREATE TYPE "MapType" AS ENUM ('MONASTERY', 'FORTRESS', 'MUSEUM', 'CHURCH', 'ARCHAEOLOGICAL', 'OTHER');

-- CreateEnum
CREATE TYPE "MenuRouteType" AS ENUM ('CATEGORY', 'SUBCATEGORY', 'SUBCATEGORY_FORM', 'PROJECT_SUBMIT_FORM', 'CUSTOM_URL');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('UPCOMING', 'ACTIVE', 'FUNDED', 'COMPLETED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CultureMenuItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "parentId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "routeType" "MenuRouteType" NOT NULL DEFAULT 'CATEGORY',
    "customUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CultureMenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CultureItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "shortDescription" TEXT,
    "menuItemId" TEXT NOT NULL,
    "region" TEXT,
    "locationName" TEXT,
    "periodLabel" TEXT,
    "century" INTEGER,
    "yearLabel" TEXT,
    "image" TEXT,
    "galleryImages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tourUrl" TEXT,
    "videoUrl" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "mapType" "MapType",
    "showOnMap" BOOLEAN NOT NULL DEFAULT false,
    "itemType" "CultureItemType" NOT NULL DEFAULT 'OTHER',
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CultureItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "region" TEXT,
    "description" TEXT,
    "image" TEXT,
    "goalAmount" INTEGER NOT NULL,
    "raisedAmount" INTEGER NOT NULL DEFAULT 0,
    "status" "ProjectStatus" NOT NULL DEFAULT 'UPCOMING',
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "description" TEXT,
    "applyUrl" TEXT,
    "applyEmail" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "year" INTEGER,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "type" "SubmissionType" NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "title" TEXT,
    "category" TEXT,
    "parentCategorySlug" TEXT,
    "parentCategoryTitle" TEXT,
    "description" TEXT,
    "message" TEXT,
    "submitterName" TEXT NOT NULL,
    "submitterEmail" TEXT NOT NULL,
    "submitterPhone" TEXT,
    "files" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ContactStatus" NOT NULL DEFAULT 'NEW',
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "foundationName" TEXT NOT NULL,
    "foundationSubtitle" TEXT NOT NULL,
    "footerDescription" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "copyrightText" TEXT NOT NULL,
    "socialLinks" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeContent" (
    "id" TEXT NOT NULL,
    "heroBadge" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroHighlight" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroImage" TEXT,
    "primaryCtaText" TEXT NOT NULL,
    "primaryCtaUrl" TEXT NOT NULL,
    "secondaryCtaText" TEXT NOT NULL,
    "secondaryCtaUrl" TEXT NOT NULL,
    "stats" JSONB NOT NULL,
    "missionTitle" TEXT NOT NULL,
    "missionHighlight" TEXT NOT NULL,
    "missionText" TEXT NOT NULL,
    "techCards" JSONB NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "ctaDescription" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "CultureMenuItem_parentId_order_idx" ON "CultureMenuItem"("parentId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "CultureMenuItem_parentId_slug_key" ON "CultureMenuItem"("parentId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "CultureItem_slug_key" ON "CultureItem"("slug");

-- CreateIndex
CREATE INDEX "CultureItem_menuItemId_order_idx" ON "CultureItem"("menuItemId", "order");

-- CreateIndex
CREATE INDEX "CultureItem_showOnMap_idx" ON "CultureItem"("showOnMap");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Submission_type_status_createdAt_idx" ON "Submission"("type", "status", "createdAt");

-- CreateIndex
CREATE INDEX "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "CultureMenuItem" ADD CONSTRAINT "CultureMenuItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CultureMenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultureItem" ADD CONSTRAINT "CultureItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "CultureMenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
