import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockType, repositoryMockFactory } from '../../../test/test-util';
import { InternalTransactionsService } from '../internal-transactions/internal-transactions.service';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryUsersMock: MockType<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          module: class FakeInternalTransactionsModule {},
          providers: [
            {
              provide: InternalTransactionsService,
              useValue: {},
            },
          ],
          exports: [InternalTransactionsService],
        },
      ],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryUsersMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
