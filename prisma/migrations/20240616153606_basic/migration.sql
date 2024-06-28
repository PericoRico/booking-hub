/*
  Warnings:

  - You are about to drop the column `email` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessType` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingHoursId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Business_email_key";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "businessType" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT DEFAULT '',
ADD COLUMN     "imagesId" INTEGER,
ADD COLUMN     "openingHoursId" INTEGER NOT NULL,
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "business_id" INTEGER,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "business_id" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpeningHours" (
    "id" SERIAL NOT NULL,
    "monday" TEXT NOT NULL,
    "tuesday" TEXT NOT NULL,
    "wednesday" TEXT NOT NULL,
    "thursday" TEXT NOT NULL,
    "friday" TEXT NOT NULL,
    "saturday" TEXT NOT NULL,
    "sunday" TEXT NOT NULL,
    "business_id" INTEGER NOT NULL,

    CONSTRAINT "OpeningHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "hero" TEXT,
    "additionalImages" TEXT[],
    "business_id" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_ownerId_key" ON "Business"("ownerId");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_openingHoursId_fkey" FOREIGN KEY ("openingHoursId") REFERENCES "OpeningHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
