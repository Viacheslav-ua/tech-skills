import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, MaxLength } from 'class-validator';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';

export class BanUserDto {
  @ApiProperty()
  @IsNumber({}, { message: ApiTextEnum.BE_NUMBER })
  readonly userId: number;

  @ApiProperty()
  @IsBoolean({ message: ApiTextEnum.BE_BOOL })
  readonly ban: boolean;

  @ApiProperty()
  @MaxLength(200, { message: ApiTextEnum.TO_200 })
  readonly banReason: string;
}
