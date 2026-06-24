-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL DEFAULT 'about-content-singleton',
    "heroEyebrow" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "missionEyebrow" TEXT NOT NULL,
    "missionTitle" TEXT NOT NULL,
    "missionIntro" TEXT NOT NULL,
    "pillars" JSONB NOT NULL,
    "whyNowHeading" TEXT NOT NULL,
    "whyNowBody" TEXT NOT NULL,
    "howWeWorkHeading" TEXT NOT NULL,
    "howWeWorkBody" TEXT NOT NULL,
    "teamEyebrow" TEXT NOT NULL,
    "teamTitle" TEXT NOT NULL,
    "teamIntro" TEXT NOT NULL,
    "careerEyebrow" TEXT NOT NULL,
    "careerTitle" TEXT NOT NULL,
    "careerIntro" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);
