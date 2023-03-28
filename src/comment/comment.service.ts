import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { CommentDocument, Comment } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  public async findAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            postId: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    }

    return this.commentModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  public async findById(id: string) {
    const comment = await this.commentModel.findOne({ _id: id });
    if (!comment) throw new NotFoundException('Such a comment is not found!');
    return comment;
  }

  public async findCommentsByPostId(id: string) {
    return this.commentModel.find({ postId: id }).exec();
  }

  public async create(createCommentDto: CreateCommentDto) {
    const createdComment = await this.commentModel.create(createCommentDto);
    return createdComment;
  }

  public async update(id: string, updateCommentDto: UpdateCommentDto) {
    const { _id } = await this.findById(id);
    return this.commentModel.findByIdAndUpdate(_id, updateCommentDto, {
      new: true,
    });
  }

  public async delete(id: string) {
    const deletedComment = await this.commentModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedComment)
      throw new NotFoundException('Such a comment is not found!');
    return deletedComment;
  }
}
