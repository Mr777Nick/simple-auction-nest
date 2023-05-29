import { Test, TestingModule } from '@nestjs/testing';

import { ItemBidsController } from './item-bids.controller';
import { ItemBidsService } from './item-bids.service';

describe('ItemBidsController', () => {
  let controller: ItemBidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemBidsController],
      providers: [ItemBidsService],
    }).compile();

    controller = module.get<ItemBidsController>(ItemBidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
