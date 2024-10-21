import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_db/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {

  constructor(private prisma: PrismaService) { }

  async create(createBusinessDto: CreateBusinessDto) {
    const { business, location, openingHours, services, images } = createBusinessDto;

    // Generar hash de la contraseña
    //const hashedPassword = await bcrypt.hash(business.password, 10);

    try {
      return await this.prisma.$transaction(async (prisma) => {

        const businessRecord = await prisma.business.create({
          data: {
            businessName: business.name,
            businessType: {
              connect: { id: business.type }
            },
            address: location.address,
            city: location.city,
            state: location.state,
            zipCode: location.zipCode,
            country: location.country,
            password: 'hashedPassword', //TODO encrypt password
            openingHours: {
              create: {
                monday: openingHours.monday,
                tuesday: openingHours.tuesday,
                wednesday: openingHours.wednesday,
                thursday: openingHours.thursday,
                friday: openingHours.friday,
                saturday: openingHours.saturday,
                sunday: openingHours.sunday,
              },
            },
            owner: {
              create: {
                name: business.owner.name,
                email: business.owner.mail,
                phone: business.owner.phone,
              },
            },
            location: {
              create: {
                address: location.address,
                city: location.city,
                state: location.state,
                zipCode: location.zipCode,
                country: location.country,
                latitude: location.latitude,
                longitude: location.longitude,
              },
            },
            businessServices: {
              create: services.map((service) => ({
                service: service.id
                  ? {
                    connectOrCreate: {
                      where: { id: service.id },
                      create: {
                        type: service.type,
                        name: service.name,
                        description: service.description,
                      },
                    },
                  }
                  : {
                    create: {
                      type: service.type,
                      name: service.name,
                      description: service.description,
                    },
                  },
                price: service.price,
                duration: service.duration,
              }))
            },
            images: {
              create: {
                hero: images.hero,
                additionalImages: images.additionalImages
              }
            }
          },
        });

        return businessRecord;

      });
    } catch (error) {
      throw new HttpException(`Can´t create that business: ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  findAll() {
    return `This action returns all business`;
  }

  async findOne(businessId: number) {

    const businessRecord = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: {
        businessType: true,
        owner: true,
        location: true,
        openingHours: true,
        businessServices: {
          include: {
            service: true,
          },
        },
        images: true
      },
    });

    if (!businessRecord) throw new HttpException(`businessRecord not found`, HttpStatus.NOT_FOUND)
    return businessRecord;
  }

  async findBusinessType(search: string): Promise<{ id: number; name: string; }[]> {

    const businessTypes = await this.prisma.businessType.findMany({
      select: {
        id: true,
        name: true
      },
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });

    return businessTypes;
  }
}
