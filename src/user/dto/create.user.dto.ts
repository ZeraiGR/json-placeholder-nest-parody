import {
  IsString,
  IsEmail,
  ValidateNested,
  IsNotEmptyObject,
  IsDefined,
  MinLength,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EmailNotRegistered } from '../validation-rules/email-not-registered.rule';
import { UsernameNotRegistered } from '../validation-rules/username-not-registered.rule';

export class Geo {
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  lng: string;
}

export class Address {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  suite: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @IsNotEmptyObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => Geo)
  geo: Geo;
}

export class Company {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  catchPhrase: string;

  @IsString()
  @IsNotEmpty()
  bs: string;
}

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @UsernameNotRegistered({ message: 'this username is already used' })
  username: string;

  @IsEmail()
  @EmailNotRegistered({ message: 'this email is already registered' })
  email: string;

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => Address)
  @ValidateNested()
  address: Address;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  website: string;

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => Company)
  @ValidateNested()
  company: Company;
}
