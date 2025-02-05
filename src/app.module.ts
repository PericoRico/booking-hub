import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma_db/prisma.module';
import { BusinessModule } from './business/business.module';
import { ServicesModule } from './services/services.module';
import { GeminiModule } from './gemini/gemini.module';
import { ImagesModule } from './images/images.module';
import { StorageModule } from './storage/storage.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    PrismaModule, 
    BusinessModule, 
    ServicesModule, 
    GeminiModule, 
    ImagesModule, 
    StorageModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
