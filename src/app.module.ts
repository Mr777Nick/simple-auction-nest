import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from '../db/data-source';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseTransformationInterceptor } from './common/interceptors/transform-response.interceptor';
import { SupabaseModule } from './common/supabase/supabase.module';
import { AuthModule } from './v1/auth/auth.module';
import { InternalTransactionsModule } from './v1/internal-transactions/internal-transactions.module';
import { ItemBidsModule } from './v1/item-bids/item-bids.module';
import { ItemsModule } from './v1/items/items.module';
import { UsersModule } from './v1/users/users.module';

@Module({
  imports: [
    AuthModule,
    SupabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    InternalTransactionsModule,
    ItemsModule,
    ItemBidsModule,
    ThrottlerModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformationInterceptor },
  ],
})
export class AppModule {}
