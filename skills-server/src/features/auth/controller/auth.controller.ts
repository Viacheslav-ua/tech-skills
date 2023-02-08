import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { CreateUserDto } from 'src/features/users/dto/crete-user.dto';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../services/jwt-auth.guard';
@ApiTags(ApiTextEnum.AUTH)
@Controller(EndpointEnum.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: ApiTextEnum.LOGIN })
  @ApiResponse({ status: 200, type: ApiTextEnum.ACCESS_TOKEN })
  @Post(EndpointEnum.LOGIN)
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @ApiOperation({ summary: ApiTextEnum.CREATE_REG_USER })
  @ApiResponse({ status: 200, type: ApiTextEnum.ACCESS_TOKEN })
  @Post(EndpointEnum.REGISTER)
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @ApiOperation({ summary: ApiTextEnum.UPDATE_TOKEN })
  @ApiResponse({ status: 201, type: ApiTextEnum.ACCESS_TOKEN })
  @UseGuards(JwtAuthGuard)
  @Post(EndpointEnum.REFRESH)
  refresh(@Request() req) {
    return this.authService.refresh(req.user.id);
  }
}
