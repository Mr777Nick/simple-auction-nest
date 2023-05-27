import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseTransformationInterceptor } from './common/interceptor/transform-response.interceptor';
import { SupabaseModule } from './common/supabase/supabase.module';
import { AuthModule } from './v1/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    SupabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformationInterceptor },
  ],
})
export class AppModule {}
