import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger(PrismaService.name);
    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.verbose('Successfully connected to the Prisma database.');
        } catch (error) {
            this.logger.error('Failed to connect to the Prisma database.', error.stack);
            throw error;
        }

    }
}