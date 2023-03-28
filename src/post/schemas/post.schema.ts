import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true, collection: 'posts' })
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  title: string;

  @Prop()
  body: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
