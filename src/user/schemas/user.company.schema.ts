import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Company {
  @Prop()
  name: string;

  @Prop()
  catchPhrase: string;

  @Prop()
  bs: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
