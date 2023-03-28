import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoModule } from 'src/photo/photo.module';
import { UserModule } from 'src/user/user.module';
import { IsUserExists } from 'src/validation-rules/user.exists.rule';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album, AlbumSchema } from './schemas/album.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => PhotoModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, IsUserExists],
  exports: [AlbumService],
})
export class AlbumModule {}
