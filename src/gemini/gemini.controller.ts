import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) { }

  @Get()
  async getText(@Query('category') category: string): Promise<string[]> {
    return await this.geminiService.getAIServices(category);
  }

}
