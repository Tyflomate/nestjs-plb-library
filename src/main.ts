import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { DurationInterceptor } from './duration/duration.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('The library API description')
    .setVersion('1.0')
    .addTag('books')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.enableCors({
  //   origin: ['florian.fr', 'nidhal.fr'],
  // });

  // app.useGlobalInterceptors(new DurationInterceptor());

  await app.listen(3000);
}
bootstrap();
