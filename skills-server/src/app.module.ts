import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './features/users/users.module';
import { RolesModule } from './features/roles/roles.module';
import { AuthModule } from './features/auth/auth.module';
import { ContactsModule } from './features/contacts/contacts.module';
import { PostsModule } from './features/posts/posts.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TodoModule } from './features/todo/todo.module';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `../.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static', 'pictures'),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     type: config.get<'aurora-mysql'>('TYPEORM_CONNECTION'),
    //     host: config.get<string>('TYPEORM_HOST'),
    //     username: config.get<string>('TYPEORM_USERNAME'),
    //     password: config.get<string>('TYPEORM_PASSWORD'),
    //     database: config.get<string>('TYPEORM_DATABASE'),
    //     port: Number(config.get<number>('TYPEORM_PORT')),
    //     entities: [__dirname + 'dist/**/*.entity{.ts, .js}'],
    //     synchronize: true,
    //     autoLoadEntities: true,
    //     logging: true,
    //   }),
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: Number(config.get<number>('TYPEORM_PORT')),
        entities: [__dirname + 'dist/**/*.entity{.ts, .js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ContactsModule,
    PostsModule,
    FilesModule,
    TodoModule,
  ],
  providers: [],
})
export class AppModule {}
