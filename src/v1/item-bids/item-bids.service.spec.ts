import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { repositoryMockFactory } from '../../../test/test-util';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../users/users.service';

import { ItemBid } from './entities/item-bid.entity';
import { ItemBidsService } from './item-bids.service';

describe('ItemBidsService', () => {
  let service: ItemBidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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

    service = module.get<ItemBidsService>(ItemBidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
