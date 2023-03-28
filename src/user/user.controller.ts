import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AlbumService } from 'src/album/album.service';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { PostService } from 'src/post/post.service';
import { TodoService } from 'src/todo/todo.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => PostService)) private postService: PostService,
    @Inject(forwardRef(() => TodoService)) private todoService: TodoService,
    @Inject(forwardRef(() => AlbumService)) private albumService: AlbumService,
  ) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string) {
    return this.userService.findById(id);
  }

  @Get(':id/posts')
  async findPostsById(@Param('id', IdValidationPipe) id: string) {
    return this.postService.findPostsByUserId(id);
  }

  @Get(':id/todos')
  async findTodosById(@Param('id', IdValidationPipe) id: string) {
    return this.todoService.findTodosByUserId(id);
  }

  @Get(':id/albums')
  async findAlbumsById(@Param('id', IdValidationPipe) id: string) {
    return this.albumService.findAlbumsByUserId(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  @Put(':id')
  async updatePut(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id')
  async updatePatch(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.userService.delete(id);
  }
}
