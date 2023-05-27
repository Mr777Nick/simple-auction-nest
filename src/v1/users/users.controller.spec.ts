import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockType, repositoryMockFactory } from '../../../test/test-util';
import { InternalTransactionsService } from '../internal-transactions/internal-transactions.service';

import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
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
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    repositoryUsersMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
