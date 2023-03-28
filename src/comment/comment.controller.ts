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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(@Query('postId') postId?: string) {
    return this.commentService.findAll(postId);
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string) {
    return this.commentService.findById(id);
  }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const newComment = await this.commentService.create(createCommentDto);
    return newComment;
  }

  @Put(':id')
  async updatePut(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Patch(':id')
  async updatePatch(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.commentService.delete(id);
  }
}
