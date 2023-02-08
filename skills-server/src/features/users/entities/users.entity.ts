import { ApiProperty } from '@nestjs/swagger';
import { Contact } from 'src/features/contacts/entities/contacts.entity';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { Role } from 'src/features/roles/entities/roles.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from 'src/features/todo/entities/todo.entity';

@Entity(EndpointEnum.USERS)
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  login: string;

  @ApiProperty()
  @Column({ nullable: true })
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: false, default: false })
  banned: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  banReason: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => Todo, (todo) => todo.user)
  tasks: Todo[];
}
