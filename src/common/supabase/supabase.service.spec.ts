import { Test, TestingModule } from '@nestjs/testing';

import { SupabaseService } from './supabase.service';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<SupabaseService>(SupabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
