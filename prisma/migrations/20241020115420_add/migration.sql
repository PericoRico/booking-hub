/*
  Warnings:

  - You are about to drop the column `businessTypeId` on the `Business` table. All the data in the column will be lost.
  - Added the required column `businessType` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_businessTypeId_fkey";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "businessTypeId",
ADD COLUMN     "businessType" TEXT NOT NULL;
