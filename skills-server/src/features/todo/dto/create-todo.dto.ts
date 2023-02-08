import { ApiProperty } from '@nestjs/swagger';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';
import { IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(64, { message: ApiTextEnum.TO_64 })
  readonly title: string;
}
