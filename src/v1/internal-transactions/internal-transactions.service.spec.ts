import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { repositoryMockFactory } from '../../../test/test-util';

import { InternalTransaction } from './entities/internal-transactions.entity';
import { InternalTransactionsService } from './internal-transactions.service';

describe('InternalTransactionsService', () => {
  let service: InternalTransactionsService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
