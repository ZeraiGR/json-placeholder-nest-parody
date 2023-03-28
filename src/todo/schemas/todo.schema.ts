import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true, collection: 'todos' })
export class Todo {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  title: string;

  @Prop()
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
