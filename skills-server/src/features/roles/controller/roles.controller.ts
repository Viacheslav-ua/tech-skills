import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entities/roles.entity';
import { RolesService } from '../services/roles.service';

@ApiTags('Roles')
@Controller(EndpointEnum.ROLES)
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Get(EndpointEnum.VALUE)
  getByValue(@Param(EndpointEnum.PARAM_VALUE) value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
