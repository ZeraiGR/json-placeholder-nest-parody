import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from 'src/comment/comment.module';
import { UserModule } from 'src/user/user.module';
import { IsUserExists } from 'src/validation-rules/user.exists.rule';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [PostController],
  providers: [PostService, IsUserExists],
  exports: [PostService],
})
export class PostModule {}
