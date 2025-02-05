/*
  Warnings:

  - You are about to drop the column `password` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "password" TEXT NOT NULL DEFAULT '';
