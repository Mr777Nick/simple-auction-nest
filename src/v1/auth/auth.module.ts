import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { SupabaseModule } from '../../common/supabase/supabase.module';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseStrategy } from './strategy/supabase.strategy';

@Module({
  imports: [PassportModule, SupabaseModule, ConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, SupabaseStrategy],
  exports: [AuthService],
})
export class AuthModule {}
