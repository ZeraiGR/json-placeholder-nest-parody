import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from 'src/post/post.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { IsPostExists } from './validation-rules/post.exists.rule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    forwardRef(() => PostModule),
  ],
  controllers: [CommentController],
  providers: [CommentService, IsPostExists],
  exports: [CommentService],
})
export class CommentModule {}
