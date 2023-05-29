import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@supabase/supabase-js';

import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';

import { CreateItemBidDto } from './dto/create-item-bid.dto';
import { ItemBidsService } from './item-bids.service';

@ApiTags('item-bids')
@Controller('item-bids')
export class ItemBidsController {
  constructor(private readonly itemBidsService: ItemBidsService) {}

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
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
  @UseGuards(SupabaseAuthGuard)
  @Get('my')
  async findMine(@Request() req: { user: AuthUser }) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
