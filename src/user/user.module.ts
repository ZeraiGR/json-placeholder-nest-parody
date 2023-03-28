import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from 'src/album/album.module';
import { PostModule } from 'src/post/post.module';
import { TodoModule } from 'src/todo/todo.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IsEmailNotRegistered } from './validation-rules/email-not-registered.rule';
import { IsUsernameNotRegistered } from './validation-rules/username-not-registered.rule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => PostModule),
    forwardRef(() => TodoModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [UserController],
  providers: [UserService, IsEmailNotRegistered, IsUsernameNotRegistered],
  exports: [UserService],
})
export class UserModule {}
