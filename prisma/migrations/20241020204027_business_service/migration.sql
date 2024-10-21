/*
  Warnings:

  - You are about to drop the column `duration` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BusinessService" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "duration",
DROP COLUMN "price";
