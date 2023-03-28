import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Album } from 'src/album/schemas/album.schema';

export type PhotoDocument = Photo & Document;

@Schema({ timestamps: true, collection: 'photos' })
export class Photo {
  @Prop({ type: Types.ObjectId, ref: 'Album' })
  albumId: Album;

  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  thumbnailUrl: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
