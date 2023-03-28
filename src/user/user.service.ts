import { CreateUserDto } from './dto/create.user.dto';
import {
  forwardRef,
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserModel } from './models/user.model';
import { UpdateUserDto } from './dto/update.user.dto';
import { PostService } from 'src/post/post.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => PostService)) private postService: PostService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async findById(id: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) throw new NotFoundException('Such a user is not found!');
    return user;
  }

  public async findByEmail(email: string): Promise<UserModel | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  public async findByUsername(
    username: string,
  ): Promise<UserModel | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  public async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const { _id } = await this.findById(id);
    return this.userModel.findByIdAndUpdate(_id, updateUserDto, { new: true });
  }

  public async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedUser) throw new NotFoundException('Such a user is not found!');
    return deletedUser;
  }
}
