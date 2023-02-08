import { ApiProperty } from '@nestjs/swagger';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsNumber({}, { message: ApiTextEnum.BE_NUMBER })
  readonly id: number;

  @ApiProperty()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @Length(2, 64, { message: ApiTextEnum.FROM_2_TO_64 })
  readonly login: string;

  @ApiProperty()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @Length(2, 64, { message: ApiTextEnum.FROM_2_TO_64 })
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @Length(2, 64, { message: ApiTextEnum.FROM_2_TO_64 })
  @IsEmail()
  readonly email?: string;
}
