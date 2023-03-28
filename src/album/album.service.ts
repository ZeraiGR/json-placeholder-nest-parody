import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create.album.dto';
import { UpdateAlbumDto } from './dto/update.album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<AlbumDocument>,
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

    return this.albumModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  public async findById(id: string) {
    const album = await this.albumModel.findOne({ _id: id });
    if (!album) throw new NotFoundException('Such an album is not found!');
    return album;
  }

  async findAlbumsByUserId(id: string) {
    return this.albumModel.find({ userId: id }).exec();
  }

  public async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = await this.albumModel.create(createAlbumDto);
    return createdAlbum;
  }

  public async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { _id } = await this.findById(id);
    return this.albumModel.findByIdAndUpdate(_id, updateAlbumDto, {
      new: true,
    });
  }

  public async delete(id: string) {
    const deletedAlbum = await this.albumModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedAlbum)
      throw new NotFoundException('Such an album is not found!');
    return deletedAlbum;
  }
}
