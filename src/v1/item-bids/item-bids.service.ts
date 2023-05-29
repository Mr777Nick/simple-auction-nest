import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThanOrEqual, Repository } from 'typeorm';

import { findObjectWithHighestValue } from '../../common/utils/util-functions';
import { ItemStatus } from '../items/enums/items.enum';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../users/users.service';

import { CreateItemBidDto } from './dto/create-item-bid.dto';
import { ItemBid } from './entities/item-bid.entity';

@Injectable()
export class ItemBidsService {
  constructor(
    @InjectRepository(ItemBid)
    private itemBidsRepository: Repository<ItemBid>,
    private itemsService: ItemsService,
    private usersService: UsersService,
  ) {}

  async createOne(userId: string, createItemBidDto: CreateItemBidDto) {
    try {
      const { itemId, price } = createItemBidDto;

      const itemBid = this.itemBidsRepository.create({
        user: { id: userId },
        item: { id: itemId },
        price,
      });

      await this.itemBidsRepository.save(itemBid);
      return itemBid;
    } catch (error) {
      throw error;
    }
  }

  async placeBid(userId: string, createItemBidDto: CreateItemBidDto) {
    try {
      const { itemId, price } = createItemBidDto;
      const user = await this.usersService.findOne(userId);

      if (user.balance < price) {
        throw new Error('Insufficient user balance');
      }

      const item = await this.itemsService.findOne(itemId, {
        where: {
          status: ItemStatus.ACTIVE,
          soldPrice: null,
          endedAt: MoreThanOrEqual(new Date()),
        },
        relations: { itemBids: { user: true } },
      });

      if (!item) {
        throw new Error('Item not found or not available for auction');
      }

      if (
        price <=
        (item.itemBids.length > 0
          ? findObjectWithHighestValue(item.itemBids, 'price').price
          : item.startPrice)
      ) {
        throw new Error('Bid price must be higher than the current price');
      }

      const bidsByUser = item.itemBids
        .filter((itemBid) => itemBid.user.id === userId)
        .sort((a, b) => b.price - a.price);

      if (bidsByUser.length > 0) {
        const lastBid = bidsByUser[0];

        if (lastBid.user.id === userId) {
          throw new Error('You are the highest bidder');
        }
      }

      const itemBid = this.createOne(userId, createItemBidDto);

      return itemBid;
    } catch (error) {
      throw error;
    }
  }

  async findAll(options?: FindManyOptions<ItemBid>) {
    try {
      const itemBids = await this.itemBidsRepository.find({
        ...options,
      });

      return itemBids;
    } catch (error) {
      throw error;
    }
  }
}
