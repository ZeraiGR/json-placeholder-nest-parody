import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { UserExists } from 'src/validation-rules/user.exists.rule';

export class CreateTodoDto {
  @IsMongoId()
  @IsNotEmpty()
  @UserExists({ message: "Such a user id doesn't exist" })
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  completed: boolean;
}
