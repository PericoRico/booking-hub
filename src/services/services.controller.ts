import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @ApiOperation({ summary: 'Get services from the DB by business type' })
  @Get('saved-by-business-type')
  async getByBusinessType(@Query('businessTypeId') businessTypeId: number) {
    return this.servicesService.getByBusinessType(businessTypeId);
  }

  @ApiOperation({ summary: 'Get recommended services from AI and DB for a business type ID' })
  @Get('recommended')
  async getRecommendedServices(@Query('businessTypeId') businessTypeId: number) {
    return this.servicesService.getRecommendedServices(businessTypeId);
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
