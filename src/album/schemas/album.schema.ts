import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type AlbumDocument = Album & Document;

@Schema({ timestamps: true, collection: 'albums' })
export class Album {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  title: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
