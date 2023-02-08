import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './core/pipes/validation.pipe';
import { EndpointEnum } from './core/helpers/endpoint.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Skills server')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(EndpointEnum.DOCS, app, document);

  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => console.log(`Server started on ${port} port`));
}

bootstrap();
