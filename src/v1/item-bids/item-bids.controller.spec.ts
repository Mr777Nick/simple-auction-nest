import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { getRepositoryToken } from '@nestjs/typeorm';

import { repositoryMockFactory } from '../../../test/test-util';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../users/users.service';

import { ItemBid } from './entities/item-bid.entity';
import { ItemBidsController } from './item-bids.controller';
import { ItemBidsService } from './item-bids.service';

describe('ItemBidsController', () => {
  let controller: ItemBidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemBidsController],
      imports: [
        ThrottlerModule.forRoot({}),
        {
          module: class FakeItemsModule {},
          providers: [
            {
              provide: ItemsService,
              useValue: {},
            },
          ],
          exports: [ItemsService],
        },
        {
          module: class FakeUsersModule {},
          providers: [
            {
              provide: UsersService,
              useValue: {},
            },
          ],
          exports: [UsersService],
        },
      ],
      providers: [
        ItemBidsService,
        {
          provide: getRepositoryToken(ItemBid),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<ItemBidsController>(ItemBidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
