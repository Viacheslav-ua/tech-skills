import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';

export class CreateUserDto {
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
