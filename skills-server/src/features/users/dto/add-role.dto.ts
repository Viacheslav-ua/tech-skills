import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';

export class AddRoleDto {
  @ApiProperty()
  @IsNumber({}, { message: ApiTextEnum.BE_NUMBER })
  readonly userId: number;

  @ApiProperty()
  @IsString({ message: ApiTextEnum.BE_STRING })
  @Length(1, 64, { message: ApiTextEnum.FROM_1_TO_64 })
  readonly value: string;
}
