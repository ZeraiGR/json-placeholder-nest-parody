import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePhotoDto } from './dto/create.photo.dto';
import { UpdatePhotoDto } from './dto/update.photo.dto';
import { Photo, PhotoDocument } from './schemas/photo.schema';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo.name) private readonly photoModel: Model<PhotoDocument>,
  ) {}

  public async findAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            albumId: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    }

    return this.photoModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  public async findById(id: string) {
    const photo = await this.photoModel.findOne({ _id: id });
    if (!photo) throw new NotFoundException('Such a photo is not found!');
    return photo;
  }

  public async findPhotosByAlbumId(id: string) {
    return this.photoModel.find({ albumId: id }).exec();
  }

  public async create(createPhotoDto: CreatePhotoDto) {
    const createdPhoto = await this.photoModel.create(createPhotoDto);
    return createdPhoto;
  }

  public async update(id: string, updatePhotoDto: UpdatePhotoDto) {
    const { _id } = await this.findById(id);
    return this.photoModel.findByIdAndUpdate(_id, updatePhotoDto, {
      new: true,
    });
  }

  public async delete(id: string) {
    const deletedPhoto = await this.photoModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedPhoto)
      throw new NotFoundException('Such a photo is not found!');
    return deletedPhoto;
  }
}
