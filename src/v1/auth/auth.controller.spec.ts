import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { SupabaseModule } from '../../common/supabase/supabase.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseStrategy } from './strategy/supabase.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule, SupabaseModule, ConfigModule],
      controllers: [AuthController],
      providers: [AuthService, SupabaseStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
