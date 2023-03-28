import { forwardRef, Inject } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PostService } from 'src/post/post.service';

@ValidatorConstraint({ async: true })
export class IsPostExists implements ValidatorConstraintInterface {
  constructor(
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
  ) {}

  async validate(id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      throw new BadRequestException('post id is incorrect');

    return this.postService.findById(id).then((post) => {
      if (!post) return false;
      return true;
    });
  }
}

export function PostExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPostExists,
    });
  };
}
