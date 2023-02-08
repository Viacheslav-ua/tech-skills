import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/users.entity';
import { UserService } from './services/user.service';
import { UserController } from './controller/users.controller';
import { Role } from 'src/features/roles/entities/roles.entity';
import { RolesModule } from 'src/features/roles/roles.module';
import { AuthModule } from 'src/features/auth/auth.module';

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RolesModule,
    ConfigModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
