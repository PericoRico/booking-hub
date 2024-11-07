import { Injectable } from '@nestjs/common';
import { BusinessService } from 'src/business/business.service';
import { GeminiService } from 'src/gemini/gemini.service';
import { PrismaService } from 'src/prisma_db/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {

  constructor(
    private prisma: PrismaService,
    private geminiService: GeminiService,
    private businessService: BusinessService
  ) { }

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

  async getRecommendedServices(businessTypeId: number) {

    const businessType = await this.businessService.findBusinessCategoryByTypeId(businessTypeId)
    const aiServices = await this.geminiService.getAIServices(businessType.name)
    const aiServicesWithIds = aiServices.map(service => ({ id: null, name: service }));

    const savedServices = await this.getByBusinessType(businessTypeId)

    const savedServicesWithIdName = savedServices.map(service => ({
      id: service.id,
      name: service.name
    }));
    // Remove AI services that are already in the DB
    const combinedServices = aiServicesWithIds.filter(aiService => {
      // Check if the AI service already exists in the database
      const existingService = savedServicesWithIdName.find(dbService => dbService.name === aiService.name);
      // Return the AI service if it doesn't exist in the database
      return !existingService;
    });

    return [...savedServicesWithIdName, ...combinedServices]
  }
}
