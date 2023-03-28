import { IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';
import { UserExists } from 'src/validation-rules/user.exists.rule';

export class UpdatePostDto {
  @IsMongoId()
  @IsOptional()
  @UserExists({ message: "Such a user doesn't exist" })
  userId: Types.ObjectId;

  @IsString()
  @IsOptional()
  @MinLength(5)
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  body: string;
}
