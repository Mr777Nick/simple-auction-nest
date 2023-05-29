import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsModule } from '../items/items.module';
import { UsersModule } from '../users/users.module';

import { ItemBid } from './entities/item-bid.entity';
import { ItemBidsController } from './item-bids.controller';
import { ItemBidsService } from './item-bids.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemBid]), ItemsModule, UsersModule],
  controllers: [ItemBidsController],
  providers: [ItemBidsService],
  exports: [ItemBidsService],
})
export class ItemBidsModule {}
