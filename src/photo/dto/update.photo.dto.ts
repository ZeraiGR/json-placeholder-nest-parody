import { IsMongoId, IsOptional, IsString, IsUrl } from 'class-validator';
import { AlbumExists } from '../validation-rules/album.exists.rule';

export class UpdatePhotoDto {
  @IsMongoId()
  @IsOptional()
  @AlbumExists({ message: "Such an album id doesn't exist!" })
  albumId: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  thumbnailUrl: string;
}
