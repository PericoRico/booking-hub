import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file (jpeg, jpg, png, gif, webp, bmp, svg)',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload an image file' })
  @ApiResponse({ 
    status: 201, 
    description: 'Image uploaded successfully' 
  })
  @ApiResponse({ 
    status: 422, 
    description: 'Unprocessable Entity - Invalid file type or size exceeds 1MB' 
  })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(image\/(jpeg|jpg|png|gif|webp|bmp|svg))/,
        })
        .addMaxSizeValidator({ maxSize: 1000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file,
  ) {
    return file;
  }
}
