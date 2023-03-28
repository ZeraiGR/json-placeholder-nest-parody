import { Type } from 'class-transformer';
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EmailNotRegistered } from '../validation-rules/email-not-registered.rule';
import { UsernameNotRegistered } from '../validation-rules/username-not-registered.rule';

export class Geo {
  @IsString()
  @IsOptional()
  lat?: string;

  @IsString()
  @IsOptional()
  lng?: string;
}

export class Address {
  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  suite?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  zipcode?: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Geo)
  geo: Geo;
}

export class Company {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  catchPhrase?: string;

  @IsString()
  @IsOptional()
  bs?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @UsernameNotRegistered({ message: 'this username is already used' })
  username?: string;

  @IsOptional()
  @IsEmail()
  @EmailNotRegistered({ message: 'this email is already registered' })
  email: string;

  @IsObject()
  @IsOptional()
  @Type(() => Address)
  @ValidateNested()
  address?: Address;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string;

  @IsObject()
  @IsOptional()
  @Type(() => Company)
  @ValidateNested()
  company?: Company;
}
