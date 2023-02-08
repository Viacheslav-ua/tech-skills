import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { ExceptionEnum } from 'src/core/helpers/exception.enum';
import { RolesEnum } from 'src/core/helpers/roles.enum';
import { RolesService } from 'src/features/roles/services/roles.service';

import { CreateUserDto } from 'src/features/users/dto/crete-user.dto';
import { UpdateUserDto } from 'src/features/users/dto/update-user.dto';
import { User } from 'src/features/users/entities/users.entity';
import { Repository } from 'typeorm';
import { AddRoleDto } from '../dto/add-role.dto';
import { BanUserDto } from '../dto/ban-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    const role = await this.roleService.getRoleByValue(RolesEnum.USER);
    user.roles = [role];
    await this.userRepository.save(user);
    return user;
  }

  async getOneUser(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: [EndpointEnum.CONTACTS],
    });
  }

  async getContactsByUser(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: [EndpointEnum.CONTACTS],
    });
  }

  async getOneTaskByUser(id: number, taskId: number): Promise<User> {
    return await this.userRepository.findOne({
      select: {
        id: true,
        tasks: true,
      },
      where: {
        id,
        tasks: { id: taskId },
      },
      relations: [EndpointEnum.TASKS],
    });
  }

  async getTasksByUser(id: number): Promise<User> {
    return await this.userRepository.findOne({
      select: {
        id: true,
        tasks: true,
      },
      where: { id },
      relations: [EndpointEnum.TASKS],
      order: {
        tasks: {
          createdAt: 'desc',
        },
      },
    });
  }

  async getUserByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { login },
      relations: [EndpointEnum.CONTACTS],
    });
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({ relations: [EndpointEnum.ROLES] });
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(
      { id: updateUserDto.id },
      { ...updateUserDto },
    );
    return this.getOneUser(updateUserDto.id);
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.getOneUser(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);
    if (role && user) {
      user.roles.push(role);
      await this.userRepository.save(user);
      return await this.getOneUser(addRoleDto.userId);
    }

    return new HttpException(ExceptionEnum.USER_ROLE_N_F, HttpStatus.NOT_FOUND);
  }

  async ban(banUserDto: BanUserDto) {
    const user = await this.getOneUser(banUserDto.userId);
    if (user) {
      user.banned = banUserDto.ban;
      user.banReason = banUserDto.banReason;
      await this.userRepository.save(user);
      return await this.userRepository.save(user);
    }
    return new HttpException(ExceptionEnum.USER_N_F, HttpStatus.NOT_FOUND);
  }
}
