/*
  Warnings:

  - You are about to drop the column `businessType` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "businessType",
ADD COLUMN     "businessTypeId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_businessTypeId_fkey" FOREIGN KEY ("businessTypeId") REFERENCES "BusinessType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
