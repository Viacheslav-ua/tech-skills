import { ApiProperty } from '@nestjs/swagger';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(EndpointEnum.ROLES)
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  value: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;
}
