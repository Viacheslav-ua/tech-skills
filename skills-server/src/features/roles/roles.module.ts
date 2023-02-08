import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controller/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { User } from 'src/features/users/entities/users.entity';

@Module({
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
