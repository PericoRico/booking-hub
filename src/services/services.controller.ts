import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Get('by-business-type')
  async getByBusinessType(@Query('businessTypeId') businessTypeId: number) {
    return this.servicesService.getByBusinessType(businessTypeId);
  }

  // @Post()
  // create(@Body() createServiceDto: CreateServiceDto) {
  //   return this.servicesService.create(createServiceDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.servicesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
  //   return this.servicesService.update(+id, updateServiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.servicesService.remove(+id);
  // }
}
