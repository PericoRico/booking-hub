/*
  Warnings:

  - You are about to drop the column `business_id` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `business_id` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[business_id]` on the table `Images` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_imagesId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_business_id_fkey";

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "business_id";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "business_id";

-- CreateTable
CREATE TABLE "BusinessService" (
    "businessId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "BusinessService_pkey" PRIMARY KEY ("businessId","serviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_business_id_key" ON "Images"("business_id");

-- AddForeignKey
ALTER TABLE "BusinessService" ADD CONSTRAINT "BusinessService_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessService" ADD CONSTRAINT "BusinessService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
