import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { ItemStatus } from './enums/items.enum';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async createOne(userId: string, createItemDto: CreateItemDto) {
    try {
      const { name, startPrice, endedAt } = createItemDto;

      const item = this.itemsRepository.create({
        user: { id: userId },
        status: ItemStatus.ACTIVE,
        name,
        startPrice,
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
      return await this.itemsRepository.find({
        ...options,
        relations: { user: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.itemsRepository.findOne({
        where: { id },
        relations: { user: true },
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
}
