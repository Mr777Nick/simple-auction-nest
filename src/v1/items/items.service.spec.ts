import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { repositoryMockFactory } from '../../../test/test-util';
import { UsersService } from '../users/users.service';

import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
