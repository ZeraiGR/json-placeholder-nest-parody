import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from 'src/album/album.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { Photo, PhotoSchema } from './schemas/photo.schema';
import { IsAlbumExists } from './validation-rules/album.exists.rule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
    forwardRef(() => AlbumModule),
  ],
  controllers: [PhotoController],
  providers: [PhotoService, IsAlbumExists],
  exports: [PhotoService],
})
export class PhotoModule {}
