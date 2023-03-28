import { IsMongoId, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { AlbumExists } from '../validation-rules/album.exists.rule';

export class CreatePhotoDto {
  @IsMongoId()
  @IsNotEmpty()
  @AlbumExists({ message: "Such an album id doesn't exist!" })
  albumId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  thumbnailUrl: string;
}
