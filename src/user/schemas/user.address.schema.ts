import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUserGeo } from '../interfaces/user.geo.interface';
import { GeoSchema } from './user.geo.schema';

@Schema({ _id: false })
export class Address {
  @Prop()
  street: string;

  @Prop()
  suite: string;

  @Prop()
  city: string;

  @Prop()
  zipcode: string;

  @Prop({ type: GeoSchema })
  geo: IUserGeo;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
