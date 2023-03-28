import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CreatePhotoDto } from './dto/create.photo.dto';
import { UpdatePhotoDto } from './dto/update.photo.dto';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async findAll(@Query('albumId') albumId?: string) {
    return this.photoService.findAll(albumId);
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string) {
    return this.photoService.findById(id);
  }

  @Post()
  async create(@Body() createPhotoDto: CreatePhotoDto) {
    const newPhoto = await this.photoService.create(createPhotoDto);
    return newPhoto;
  }

  @Put(':id')
  async updatePut(
    @Param('id', IdValidationPipe) id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return this.photoService.update(id, updatePhotoDto);
  }

  @Patch(':id')
  async updatePatch(
    @Param('id', IdValidationPipe) id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return this.photoService.update(id, updatePhotoDto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.photoService.delete(id);
  }
}
