import { ApiProperty } from '@nestjs/swagger';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { User } from 'src/features/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(EndpointEnum.POSTS)
export class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  content: string;

  @ApiProperty()
  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User)
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
