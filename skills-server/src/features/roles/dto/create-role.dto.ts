import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MaxLength } from 'class-validator';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';

export class CreateRoleDto {
  @ApiProperty()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @Length(1, 64, { message: ApiTextEnum.FROM_1_TO_64 })
  readonly value: string;

  @ApiProperty()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(200, { message: ApiTextEnum.TO_200 })
  readonly description: string;
}
