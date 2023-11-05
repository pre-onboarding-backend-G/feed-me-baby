import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

  const validationPipeOptions = {
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  };

  const corsOptions = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  };

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The Example API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const dataSource = app.get(DataSource);
  const migrationsPending = await dataSource.showMigrations();
  if (migrationsPending) {
    Logger.log('Running migrations...', 'Migration');
    await dataSource.runMigrations();
  }
  

  app
    .useGlobalPipes(new ValidationPipe(validationPipeOptions))
    .useGlobalFilters(new HttpExceptionFilter(new Logger()))
    .enableCors(corsOptions);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
