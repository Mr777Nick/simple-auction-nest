import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { SupabaseService } from '../../common/supabase/supabase.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        ConfigModule,
        {
          module: class FakeSupabaseModule {},
          providers: [
            {
              provide: SupabaseService,
              useValue: {
                signIn: jest.fn(),
                signUp: jest.fn(),
                getProfile: jest.fn(),
              },
            },
          ],
          exports: [SupabaseService],
        },
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
