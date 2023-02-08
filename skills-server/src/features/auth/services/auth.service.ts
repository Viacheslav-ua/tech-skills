import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/features/users/dto/crete-user.dto';
import { UserService } from 'src/features/users/services/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/features/users/entities/users.entity';
import { ConfigService } from '@nestjs/config';
import { ExceptionEnum } from 'src/core/helpers/exception.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    return this.generateAccessToken(user);
  }

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(
      createUserDto.login,
    );
    if (candidate) {
      throw new HttpException(
        ExceptionEnum.USER_LOGIN_N_F,
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = Number(this.configService.get<string>('SALT'));
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashPassword,
    });

    return this.generateAccessToken(user);
  }

  async refresh(id: number) {
    const user = await this.userService.getOneUser(id);
    return this.generateAccessToken(user);
  }

  private async generateAccessToken(user: User) {
    const payload = { login: user.login, id: user.id, roles: user.roles };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(createUserDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(createUserDto.login);
    if (!user) {
      throw new HttpException(ExceptionEnum.USER_L_N_F, HttpStatus.BAD_REQUEST);
    }
    const passwordEquals = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
