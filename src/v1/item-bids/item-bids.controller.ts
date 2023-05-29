import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthUser } from '@supabase/supabase-js';

import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';

import { CreateItemBidDto } from './dto/create-item-bid.dto';
import { ItemBid } from './entities/item-bid.entity';
import { ItemBidLimitGuard } from './guards/item-bid-limit.guard';
import { ItemBidsService } from './item-bids.service';

@ApiTags('item-bids')
@Controller('item-bids')
export class ItemBidsController {
  constructor(private readonly itemBidsService: ItemBidsService) {}

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @UseGuards(ItemBidLimitGuard)
  @Throttle(1, 5)
  @Post()
  async create(
    @Request() req: { user: AuthUser },
    @Body() createItemBidDto: CreateItemBidDto,
  ) {
    try {
      await this.itemBidsService.placeBid(req.user.id, createItemBidDto);
      return { message: 'Item bid placed' };
    } catch (error) {
      if (error.message == 'Insufficient user balance')
        throw new BadRequestException(error.message);

      if (error.message == 'Item not found or not available for auction')
        throw new NotFoundException(error.message);

      if (error.message == 'Bid price must be higher than the current price')
        throw new BadRequestException(error.message);

      if (error.message == 'You are the highest bidder')
        throw new BadRequestException(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiPaginatedResponse(ItemBid)
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('my')
  async findMine(
    @Request() req: { user: AuthUser },
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ItemBid>> {
    try {
      const { order, take, skip } = pageOptionsDto;

      const result = await this.itemBidsService.findAll({
        where: {
          user: { id: req.user.id },
        },
        relations: { item: true },
        order: { createdAt: order },
        skip,
        take,
      });

      const pageMetaDto = new PageMetaDto({
        itemCount: result.itemBidsCount,
        pageOptionsDto,
      });

      return new PageDto(result.itemBids, pageMetaDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
