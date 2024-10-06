import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_db/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {

  constructor(private prisma: PrismaService) { }

  async create(createBusinessDto: CreateBusinessDto) {
    const { business, location, openingHours, services } = createBusinessDto;

    // Generar hash de la contraseña
    //const hashedPassword = await bcrypt.hash(business.password, 10);

    return this.prisma.$transaction(async (prisma) => {

      const businessRecord = await prisma.business.create({
        data: {
          businessName: business.name,
          businessType: business.type,
          address: location.address,
          city: location.city,
          state: location.state,
          zipCode: location.zipCode,
          country: location.country,
          password: 'hashedPassword',
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
          services: {
            create: services.map((service) => ({
              service: {
                create: {
                  type: service.type,
                  name: service.name,
                  description: service.description,
                  price: service.price,
                  duration: service.duration,
                }
              }
            }))
          }
        },
      });

      return businessRecord;
    });
  }

  findAll() {
    return `This action returns all business`;
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
