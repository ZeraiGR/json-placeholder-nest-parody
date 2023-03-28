import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoDto } from './dto/update.todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(@Query('userId') userId?: string) {
    return this.todoService.findAll(userId);
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string) {
    return this.todoService.findById(id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const newTodo = await this.todoService.create(createTodoDto);
    return newTodo;
  }

  @Put(':id')
  async updatePut(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Patch(':id')
  async updatePatch(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.todoService.delete(id);
  }
}
