import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';
import { PostExists } from '../validation-rules/post.exists.rule';

export class UpdateCommentDto {
  @IsMongoId()
  @IsOptional()
  @PostExists({ message: 'Such a post id is not found' })
  postId: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  body: string;
}
