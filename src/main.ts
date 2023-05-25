import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple Auction API')
    .setDescription('The backend API for the Simple Auction app')
    .setVersion('1.0')
    .setContact(
      'Bagas Naufal Insani',
      'https://github.com/Mr777Nick',
      'bagas_naufal96@yahoo.co.id',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
