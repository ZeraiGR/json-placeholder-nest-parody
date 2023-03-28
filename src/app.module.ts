import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/sandbox'),
    PostModule,
    UserModule,
    CommentModule,
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    TodoModule,
    AlbumModule,
    PhotoModule,
  ],
})
export class AppModule {}
