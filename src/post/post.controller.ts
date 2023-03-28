import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Inject,
} from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @Inject(forwardRef(() => CommentService))
    private commentService: CommentService,
  ) {}

  @Get()
  async findAll(@Query('userId') userId?: string) {
    return this.postService.findAll(userId);
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string) {
    return this.postService.findById(id);
  }

  @Get(':id/comments')
  async findCommentsById(@Param('id', IdValidationPipe) id: string) {
    return this.commentService.findCommentsByPostId(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const newUser = await this.postService.create(createPostDto);
    return newUser;
  }

  @Put(':id')
  async updatePut(
    @Param('id', IdValidationPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Patch(':id')
  async updatePatch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.postService.delete(id);
  }
}
