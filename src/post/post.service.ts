import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
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

    return this.postModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  public async findById(id: string) {
    const post = await this.postModel.findOne({ _id: id });
    if (!post) throw new NotFoundException('Such a post is not found!');
    return post;
  }

  public async findPostsByUserId(id: string) {
    return this.postModel.find({ userId: id }).exec();
  }

  public async create(createPostDto: CreatePostDto) {
    const createdPost = await this.postModel.create(createPostDto);
    return createdPost;
  }

  public async update(id: string, updatePostDto: UpdatePostDto) {
    const { _id } = await this.findById(id);
    return this.postModel.findByIdAndUpdate(_id, updatePostDto, { new: true });
  }

  public async delete(id: string) {
    const deletedPost = await this.postModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedPost) throw new NotFoundException('Such a post is not found!');
    return deletedPost;
  }
}
