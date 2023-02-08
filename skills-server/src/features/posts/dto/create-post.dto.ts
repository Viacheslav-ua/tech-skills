import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';

export class CreatePostDto {
  @ApiProperty()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(200, { message: ApiTextEnum.TO_200 })
  readonly title: string;

  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(200, { message: ApiTextEnum.TO_200 })
  readonly content: string;

  @ApiProperty()
  readonly userId: number;
}
