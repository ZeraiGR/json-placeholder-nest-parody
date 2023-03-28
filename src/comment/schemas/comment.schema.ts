import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/post/schemas/post.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true, collection: 'comments' })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'Post' })
  postId: Post;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  body: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
