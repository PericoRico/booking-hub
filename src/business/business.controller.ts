import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) { }

  @Post()
  async create(@Body() createBusinessDto: CreateBusinessDto) {
    try {
      return await this.businessService.create(createBusinessDto);
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  @Get('type')
  async findBusinessType(@Query('search') search: string) {
    return this.businessService.findBusinessType(search);
  }

  @Get('category')
  async findBusinessCategoryByType(@Query('businessTypeId') businessTypeId: number) {
    return this.businessService.findBusinessCategoryByTypeId(businessTypeId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }



}
