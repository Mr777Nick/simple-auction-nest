import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresTypeOrmConfigService } from './common/database/postgres-typeorm-config-service';
import { ResponseTransformationInterceptor } from './common/interceptor/transform-response.interceptor';
import { SupabaseModule } from './common/supabase/supabase.module';
import { AuthModule } from './v1/auth/auth.module';
import { UsersModule } from './v1/users/users.module';

@Module({
  imports: [
    AuthModule,
    SupabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: PostgresTypeOrmConfigService,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformationInterceptor },
  ],
})
export class AppModule {}
