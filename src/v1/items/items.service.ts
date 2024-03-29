import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  LessThanOrEqual,
  Repository,
} from 'typeorm';

import { DatabaseValue } from '../../common/constants/database-value.constant';
import { InternalTransactionType } from '../internal-transactions/enums/internal-transaction.enum';
import { UsersService } from '../users/users.service';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { ItemStatus } from './enums/items.enum';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private usersService: UsersService,
  ) {}

  async createOne(userId: string, createItemDto: CreateItemDto) {
    try {
      const { name, startPrice, endedAt } = createItemDto;

      const item = this.itemsRepository.create({
        user: { id: userId },
        status: ItemStatus.ACTIVE,
        name,
        startPrice,
        currentPrice: startPrice,
        endedAt,
      });

      await this.itemsRepository.save(item);
      return item;
    } catch (error) {
      throw error;
    }
  }

  async findAll(options?: FindManyOptions<Item>) {
    try {
      const query = {
        ...options,
        relations: { user: true, itemBids: true, ...options?.relations },
      };

      const items = await this.itemsRepository.find(query);
      const itemsCount = await this.itemsRepository.count(query);

      return { items, itemsCount };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string, options?: FindOneOptions<Item>) {
    try {
      return await this.itemsRepository.findOne({
        ...options,
        where: { id, ...options?.where },
        relations: { user: true, ...options?.relations },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateItemDto: UpdateItemDto, userId: string) {
    try {
      await this.itemsRepository.update(id, {
        ...updateItemDto,
        updatedBy: userId,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCurrentPrice(id: string, currentPrice: number) {
    try {
      await this.itemsRepository.update(id, {
        currentPrice,
        updatedBy: DatabaseValue.SYSTEM,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateOnlyMyItem(
    id: string,
    updateItemDto: UpdateItemDto,
    userId: string,
  ) {
    try {
      const item = await this.itemsRepository.findOne({
        where: { id },
        relations: { user: true },
      });

      if (!item) {
        throw new Error('Item not found');
      }

      if (item.user.id !== userId) {
        throw new Error('You are not allowed to update this item');
      }

      await this.update(id, updateItemDto, userId);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, userId?: string) {
    try {
      await this.itemsRepository.update({ id }, { deletedBy: userId });

      await this.itemsRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async removeOnlyMyItem(id: string, userId: string) {
    try {
      const item = await this.itemsRepository.findOne({
        where: { id },
        relations: { user: true },
      });

      if (!item) {
        throw new Error('Item not found');
      }

      if (item.user.id !== userId) {
        throw new Error('You are not allowed to remove this item');
      }

      await this.remove(id, userId);
    } catch (error) {
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async markItemsAsSold() {
    try {
      const newlyFinishedItems = await this.findAll({
        where: {
          status: ItemStatus.ACTIVE,
          endedAt: LessThanOrEqual(new Date()),
          soldPrice: null,
        },
        relations: { user: true, itemBids: true },
      });

      newlyFinishedItems.items.forEach(async (item) => {
        if (item.itemBids.length > 0) {
          const soldItem = await this.itemsRepository.save({
            ...item,
            soldPrice: item.currentPrice,
            status: ItemStatus.SOLD,
            updatedBy: DatabaseValue.SYSTEM,
          });

          await this.usersService.addBalance(
            item.user.id,
            soldItem.soldPrice,
            InternalTransactionType.ITEM_SOLD,
          );
        } else {
          await this.itemsRepository.update(item.id, {
            status: ItemStatus.INACTIVE,
            updatedBy: DatabaseValue.SYSTEM,
          });
        }
      });
    } catch (error) {}
  }
}
