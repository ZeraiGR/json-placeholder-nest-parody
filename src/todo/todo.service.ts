import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoDto } from './dto/update.todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  public async findAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            userId: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    }

    return this.todoModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  public async findById(id: string) {
    const todo = await this.todoModel.findOne({ _id: id });
    if (!todo) throw new NotFoundException('Such a todo is not found!');
    return todo;
  }

  async findTodosByUserId(id: string) {
    return this.todoModel.find({ userId: id }).exec();
  }

  public async create(createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todoModel.create(createTodoDto);
    return createdTodo;
  }

  public async update(id: string, updateTodoDto: UpdateTodoDto) {
    const { _id } = await this.findById(id);
    return this.todoModel.findByIdAndUpdate(_id, updateTodoDto, { new: true });
  }

  public async delete(id: string) {
    const deletedTodo = await this.todoModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedTodo) throw new NotFoundException('Such a todo is not found!');
    return deletedTodo;
  }
}
