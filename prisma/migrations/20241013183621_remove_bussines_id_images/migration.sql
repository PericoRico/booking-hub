/*
  Warnings:

  - You are about to drop the column `business_id` on the `Images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_business_id_fkey";

-- DropIndex
DROP INDEX "Images_business_id_key";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "business_id";

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
