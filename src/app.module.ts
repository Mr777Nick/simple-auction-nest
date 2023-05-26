import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseTransformationInterceptor } from './common/interceptor/transform-response.interceptor';
import { SupabaseModule } from './common/supabase/supabase.module';
import { AuthModule } from './v1/auth/auth.module';
import { UsersModule } from './v1/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, SupabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformationInterceptor },
  ],
})
export class AppModule {}
