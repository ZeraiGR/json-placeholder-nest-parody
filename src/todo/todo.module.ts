import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { IsUserExists } from 'src/validation-rules/user.exists.rule';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [TodoController],
  providers: [TodoService, IsUserExists],
  exports: [TodoService],
})
export class TodoModule {}
