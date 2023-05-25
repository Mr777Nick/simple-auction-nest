import * as fs from 'fs';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const V1_PREFIX = '1';

  app
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: V1_PREFIX,
    })
    .useGlobalPipes(new ValidationPipe({ transform: true }));

  const v1Config = new DocumentBuilder()
    .setTitle('Simple Auction API')
    .setDescription('The backend API for the Simple Auction app')
    .setContact(
      'Bagas Naufal Insani',
      'https://github.com/Mr777Nick',
      'bagas_naufal96@yahoo.co.id',
    )
    .setVersion(`V${V1_PREFIX}`)
    .setExternalDoc('Postman Collection', `docs-json`)
    .build();
  const v1Document = SwaggerModule.createDocument(app, v1Config);
  fs.writeFileSync(
    `./postman/schemas/swagger.json`,
    JSON.stringify(v1Document, null, 2),
  );
  SwaggerModule.setup(`v${V1_PREFIX}/docs`, app, v1Document);

  await app.listen(3000);
}
bootstrap();
