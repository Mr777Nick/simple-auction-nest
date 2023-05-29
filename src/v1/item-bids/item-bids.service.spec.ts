import { Test, TestingModule } from '@nestjs/testing';

import { ItemBidsService } from './item-bids.service';

describe('ItemBidsService', () => {
  let service: ItemBidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemBidsService],
    }).compile();

    service = module.get<ItemBidsService>(ItemBidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
