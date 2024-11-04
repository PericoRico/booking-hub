import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaModule } from 'src/prisma_db/prisma.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [PrismaModule, GeminiModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule { }
