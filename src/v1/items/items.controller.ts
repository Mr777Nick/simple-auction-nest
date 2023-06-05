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
  Query,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@supabase/supabase-js';
import { LessThan, MoreThanOrEqual } from 'typeorm';

import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { Order } from '../../common/enums/order.enum';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
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
  @ApiPaginatedResponse(Item)
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ excludePrefixes: ['balance'] })
  @Get('ongoing')
  async findActiveItems(
    @Request() req: { user: AuthUser },
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Item>> {
    try {
      const { order, take, skip } = pageOptionsDto;

      const result = await this.itemsService.findAll({
        where: {
          status: ItemStatus.ACTIVE,
          soldPrice: null,
          endedAt: MoreThanOrEqual(new Date()),
        },
        order: { endedAt: order, createdAt: Order.DESC },
        skip,
        take,
      });

      const pageMetaDto = new PageMetaDto({
        itemCount: result.itemsCount,
        pageOptionsDto,
      });

      const items = result.items.map((item) => {
        if (item.user.id === req.user.id) {
          return { ...item, isMine: true };
        }

        return item;
      });

      return new PageDto(items, pageMetaDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiPaginatedResponse(Item)
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ excludePrefixes: ['balance'] })
  @Get('completed')
  async findInactiveItems(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Item>> {
    try {
      const { order, take, skip } = pageOptionsDto;

      const result = await this.itemsService.findAll({
        where: {
          endedAt: LessThan(new Date()),
        },
        order: { endedAt: order, createdAt: Order.DESC },
        skip,
        take,
      });

      const pageMetaDto = new PageMetaDto({
        itemCount: result.itemsCount,
        pageOptionsDto,
      });

      return new PageDto(result.items, pageMetaDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiPaginatedResponse(Item)
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ excludePrefixes: ['balance'] })
  @Get('my')
  async findMine(
    @Request() req: { user: AuthUser },
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Item>> {
    try {
      const { order, take, skip } = pageOptionsDto;

      const result = await this.itemsService.findAll({
        where: {
          user: { id: req.user.id },
        },
        order: { endedAt: order, createdAt: Order.DESC },
        skip,
        take,
      });

      const pageMetaDto = new PageMetaDto({
        itemCount: result.itemsCount,
        pageOptionsDto,
      });

      return new PageDto(result.items, pageMetaDto);
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
