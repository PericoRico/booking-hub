-- DropForeignKey
ALTER TABLE "BusinessService" DROP CONSTRAINT "BusinessService_businessId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessService" DROP CONSTRAINT "BusinessService_serviceId_fkey";

-- AddForeignKey
ALTER TABLE "BusinessService" ADD CONSTRAINT "BusinessService_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessService" ADD CONSTRAINT "BusinessService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
