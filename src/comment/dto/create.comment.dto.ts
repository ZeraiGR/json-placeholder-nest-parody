import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { PostExists } from '../validation-rules/post.exists.rule';

export class CreateCommentDto {
  @IsMongoId()
  @IsNotEmpty()
  @PostExists({ message: 'Such a post id is not found' })
  postId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
