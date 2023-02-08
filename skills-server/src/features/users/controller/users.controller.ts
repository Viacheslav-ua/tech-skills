import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/features/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/features/auth/services/roles.guard';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { RolesEnum } from 'src/core/helpers/roles.enum';
import { AddRoleDto } from '../dto/add-role.dto';
import { BanUserDto } from '../dto/ban-user.dto';
import { User } from '../entities/users.entity';
import { UserService } from '../services/user.service';

@ApiTags(ApiTextEnum.USERS)
@Controller(EndpointEnum.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: ApiTextEnum.GET_USERS })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: ApiTextEnum.ASSIGN_ROLES })
  @ApiResponse({ status: 200 })
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Post(EndpointEnum.ROLE)
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: ApiTextEnum.BANNED_USER })
  @ApiResponse({ status: 200 })
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Post(EndpointEnum.BAN)
  async ban(@Body() banUserDto: BanUserDto) {
    return this.userService.ban(banUserDto);
  }
}
