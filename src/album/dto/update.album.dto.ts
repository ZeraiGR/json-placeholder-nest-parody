import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { UserExists } from 'src/validation-rules/user.exists.rule';

export class UpdateAlbumDto {
  @IsMongoId()
  @IsOptional()
  @UserExists({ message: "Such a user id doesn't exist" })
  userId: string;

  @IsString()
  @IsOptional()
  title: string;
}
