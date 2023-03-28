import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { UserExists } from 'src/validation-rules/user.exists.rule';

export class CreateAlbumDto {
  @IsMongoId()
  @IsNotEmpty()
  @UserExists({ message: "Such a user id doesn't exist" })
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
