import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { OwnerGuard } from 'src/auth/guards/owner.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) { }

  @Public() 
  @Post()
  async create(@Body() createBusinessDto: CreateBusinessDto) {
    try {
      return await this.businessService.create(createBusinessDto);
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  @Public()
  @Get('type')
  async findBusinessType(@Query('search') search: string) {
    return this.businessService.findBusinessType(search);
  }

  @Public()
  @Get('category')
  async findBusinessCategoryByType(@Query('businessTypeId') businessTypeId: number) {
    return this.businessService.findBusinessCategoryByTypeId(businessTypeId);
  }

  @UseGuards(OwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }



}
