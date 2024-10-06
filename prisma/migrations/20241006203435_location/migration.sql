/*
  Warnings:

  - You are about to drop the column `locationId` on the `Business` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_locationId_fkey";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "locationId";
