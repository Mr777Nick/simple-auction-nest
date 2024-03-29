import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThanOrEqual, Repository } from 'typeorm';

import { InternalTransactionType } from '../internal-transactions/enums/internal-transaction.enum';
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

      if (price <= item.currentPrice) {
        throw new Error('Bid price must be higher than the current price');
      }

      const sortedBids = item.itemBids.sort((a, b) => b.price - a.price);
      if (sortedBids.length > 0) {
        const highestBid = sortedBids[0];

        if (highestBid.user.id === userId) {
          throw new Error('You are the highest bidder');
        }

        await this.usersService.addBalance(
          highestBid.user.id,
          highestBid.price,
          InternalTransactionType.ITEM_BID_REFUND,
        );
      }

      await this.usersService.deductBalance(
        userId,
        price,
        InternalTransactionType.ITEM_BID,
      );

      await this.itemsService.updateCurrentPrice(item.id, price);

      const itemBid = await this.createOne(userId, createItemBidDto);

      return itemBid;
    } catch (error) {
      throw error;
    }
  }

  async findAll(options?: FindManyOptions<ItemBid>) {
    try {
      const query = {
        ...options,
      };

      const itemBids = await this.itemBidsRepository.find(query);
      const itemBidsCount = await this.itemBidsRepository.count(query);

      return { itemBids, itemBidsCount };
    } catch (error) {
      throw error;
    }
  }
}
