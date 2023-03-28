import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create.album.dto';
import { UpdateAlbumDto } from './dto/update.album.dto';

@Controller('albums')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => PhotoService)) private photoService: PhotoService,
  ) {}

  @Get()
  async findAll(@Query('userId') userId?: string) {
    return this.albumService.findAll(userId);
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string) {
    return this.albumService.findById(id);
  }

  @Get(':id/photos')
  async findPhotosById(@Param('id', IdValidationPipe) id: string) {
    return this.photoService.findPhotosByAlbumId(id);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.albumService.create(createAlbumDto);
    return newAlbum;
  }

  @Put(':id')
  async updatePut(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Patch(':id')
  async updatePatch(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.albumService.delete(id);
  }
}
