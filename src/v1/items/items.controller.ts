import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@supabase/supabase-js';
import { LessThan, MoreThanOrEqual } from 'typeorm';

import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemStatus } from './enums/items.enum';
import { ItemsService } from './items.service';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Post()
  async create(
    @Request() req: { user: AuthUser },
    @Body() createItemDto: CreateItemDto,
  ) {
    try {
      await this.itemsService.createOne(req.user.id, createItemDto);
      return { message: 'Item created' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ excludePrefixes: ['balance'] })
  @Get('ongoing')
  async findActiveItems() {
    try {
      const items = await this.itemsService.findAll({
        where: {
          status: ItemStatus.ACTIVE,
          soldPrice: null,
          endedAt: MoreThanOrEqual(new Date()),
        },
        order: { endedAt: 'DESC' },
      });

      return items;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ excludePrefixes: ['balance'] })
  @Get('completed')
  async findInactiveItems() {
    try {
      const items = await this.itemsService.findAll({
        where: {
          endedAt: LessThan(new Date()),
        },
        order: { endedAt: 'DESC' },
      });

      return items;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ excludePrefixes: ['balance'] })
  @Get('my')
  async findMine(@Request() req: { user: AuthUser }) {
    try {
      const items = await this.itemsService.findAll({
        where: {
          user: { id: req.user.id },
        },
        order: { endedAt: 'DESC' },
      });

      return items;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ excludePrefixes: ['balance'] })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const item = await this.itemsService.findOne(id);

      return item;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Patch(':id')
  async update(
    @Request() req: { user: AuthUser },
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    try {
      await this.itemsService.updateOnlyMyItem(id, updateItemDto, req.user.id);

      return { message: 'Item updated' };
    } catch (error) {
      if (error.message == 'Item not found')
        throw new NotFoundException(error.message);

      if (error.message == 'You are not allowed to update this item')
        throw new ForbiddenException(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Delete(':id')
  async remove(@Request() req: { user: AuthUser }, @Param('id') id: string) {
    try {
      await this.itemsService.removeOnlyMyItem(id, req.user.id);

      return { message: 'Item removed' };
    } catch (error) {
      if (error.message == 'Item not found')
        throw new NotFoundException(error.message);

      if (error.message == 'You are not allowed to remove this item')
        throw new ForbiddenException(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }
}
