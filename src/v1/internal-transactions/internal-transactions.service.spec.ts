import { Test, TestingModule } from '@nestjs/testing';

import { InternalTransactionsService } from './internal-transactions.service';

describe('InternalTransactionsService', () => {
  let service: InternalTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalTransactionsService],
    }).compile();

    service = module.get<InternalTransactionsService>(
      InternalTransactionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
