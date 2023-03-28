import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Geo {
  @Prop()
  lat: string;

  @Prop()
  lng: string;
}

export const GeoSchema = SchemaFactory.createForClass(Geo);
