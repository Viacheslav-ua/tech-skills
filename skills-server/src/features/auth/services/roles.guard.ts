import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ExceptionEnum } from 'src/core/helpers/exception.enum';
import { KeysEnum } from 'src/core/helpers/keys.enum';
import { Role } from 'src/features/roles/entities/roles.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride(
        KeysEnum.ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }

      const authorization = req.headers?.authorization?.split(' ');
      const bearer = authorization[0];
      const token = authorization[1];

      if (bearer !== KeysEnum.BEARER || !token) {
        throw new UnauthorizedException();
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      return user.roles.some((role: Role) =>
        requiredRoles.includes(role.value),
      );
    } catch (e) {
      throw new HttpException(ExceptionEnum.NO_ACCESS, HttpStatus.FORBIDDEN);
    }
  }
}
