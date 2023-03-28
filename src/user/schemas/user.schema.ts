import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUserAddress } from '../interfaces/user.address.interface';
import { IUserCompany } from '../interfaces/user.company.interface';
import { AddressSchema } from './user.address.schema';
import { CompanySchema } from './user.company.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  email: string;

  @Prop({ type: AddressSchema })
  address: IUserAddress;

  @Prop()
  phone: string;

  @Prop()
  website: string;

  @Prop({ type: CompanySchema })
  company: IUserCompany;
}

export const UserSchema = SchemaFactory.createForClass(User);
