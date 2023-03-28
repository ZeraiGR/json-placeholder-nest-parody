import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserExists } from 'src/validation-rules/user.exists.rule';

export class CreatePostDto {
  @IsMongoId()
  @IsNotEmpty()
  @UserExists({ message: "Such a user id doesn't exist" })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  body: string;
}
