import { ApiProperty } from '@nestjs/swagger';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(64, { message: ApiTextEnum.TO_64 })
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(64, { message: ApiTextEnum.TO_64 })
  readonly nicName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(64, { message: ApiTextEnum.TO_64 })
  readonly lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(200, { message: ApiTextEnum.TO_200 })
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(64, { message: ApiTextEnum.TO_64 })
  readonly phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @IsEmail()
  @MaxLength(64, { message: ApiTextEnum.TO_64 })
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(128, { message: ApiTextEnum.TO_128 })
  readonly avatar?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly markForRemove: boolean;
}
