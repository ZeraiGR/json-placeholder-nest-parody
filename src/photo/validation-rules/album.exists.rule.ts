import { forwardRef, Inject } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AlbumService } from 'src/album/album.service';

@ValidatorConstraint({ async: true })
export class IsAlbumExists implements ValidatorConstraintInterface {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  async validate(id: string) {
    if (!id?.match(/^[0-9a-fA-F]{24}$/))
      throw new BadRequestException('album id is incorrect');

    return this.albumService.findById(id).then((album) => {
      if (!album) return false;
      return true;
    });
  }
}

export function AlbumExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAlbumExists,
    });
  };
}
