import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const V1_PREFIX = '1';
  const v1Config = new DocumentBuilder()
    .setTitle('Simple Auction API')
    .setDescription('The backend API for the Simple Auction app')
    .setContact(
      'Bagas Naufal Insani',
      'https://github.com/Mr777Nick',
      'bagas_naufal96@yahoo.co.id',
    )
    .setVersion(`V${V1_PREFIX}`)
    .build();
  const v1Document = SwaggerModule.createDocument(app, v1Config, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup(`v${V1_PREFIX}/docs`, app, v1Document);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: V1_PREFIX,
  });

  await app.listen(3000);
}
bootstrap();
