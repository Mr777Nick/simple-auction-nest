import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockType, repositoryMockFactory } from '../../../test/test-util';

import { InternalTransaction } from './entity/internal-transactions.entity';
import { InternalTransactionsService } from './internal-transactions.service';

describe('InternalTransactionsService', () => {
  let service: InternalTransactionsService;
  let repositoryInternalTransactionsMock: MockType<InternalTransaction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InternalTransactionsService,
        {
          provide: getRepositoryToken(InternalTransaction),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<InternalTransactionsService>(
      InternalTransactionsService,
    );
    repositoryInternalTransactionsMock = module.get(
      getRepositoryToken(InternalTransaction),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
