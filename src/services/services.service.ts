import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_db/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {

  constructor(private prisma: PrismaService) { }

  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  async getByBusinessType(businessTypeId: number) {

    const businessWithServices = await this.prisma.service.findMany({
      where: {
        businessService: {
          some: {
            business: {
              businessTypeId: businessTypeId
            }
          }
        }
      },
    });

    return businessWithServices
  }
}
