import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@ApiTags('business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) { }

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    try {
      return this.businessService.create(createBusinessDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('type')
  async findBusinessType(@Query('search') search: string) {
    return this.businessService.findBusinessType(search);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }



}
