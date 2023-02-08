import { ApiProperty } from '@nestjs/swagger';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: ApiTextEnum.BE_NUMBER })
  id?: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(64, { message: ApiTextEnum.TO_64 })
  readonly title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(200, { message: ApiTextEnum.TO_200 })
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isCompleted?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @MaxLength(64, { message: ApiTextEnum.TO_64 })
  readonly status?: string;
}
