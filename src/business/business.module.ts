import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma_db/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule { }
