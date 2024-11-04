import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { PrismaService } from 'src/prisma_db/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {

  constructor(
    private prisma: PrismaService,
    private geminiService: GeminiService
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

  async getRecommendedServices(category: string) {

    const aiServices = await this.geminiService.getAIServices(category)
    const aiServicesWithIds = aiServices.map(service => ({ id: null, name: service }));

    //   // Combinar ambos arrays
    // const combinedServices = aiServicesWithIds.map(aiService => {
    //   // Buscar si el servicio de la IA ya existe en la base de datos
    //   const existingService = dbServices.find(dbService => dbService.name === aiService.name);
    //   // Si existe, se usa el `id` del servicio en la base de datos; de lo contrario, se queda con `id: null`
    //   return existingService ? existingService : aiService;
    // });

    return aiServicesWithIds
  }
}
