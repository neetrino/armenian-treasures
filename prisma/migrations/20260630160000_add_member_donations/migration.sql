-- CreateEnum
CREATE TYPE "MemberDonationStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "MemberDonation" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "label" TEXT NOT NULL,
    "status" "MemberDonationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberDonation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MemberDonation_memberId_createdAt_idx" ON "MemberDonation"("memberId", "createdAt");

-- AddForeignKey
ALTER TABLE "MemberDonation" ADD CONSTRAINT "MemberDonation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
