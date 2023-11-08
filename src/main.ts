import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomLogger } from './common/logger/custom.logger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

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
    .addTag('인증')
    .addTag('사용자')
    //JWT 토큰 설정
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'authorization',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'accessToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useLogger(app.get(CustomLogger));
  app
    .useGlobalPipes(new ValidationPipe(validationPipeOptions))
    .useGlobalFilters(new HttpExceptionFilter(app.get(CustomLogger)))
    .enableCors(corsOptions);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
