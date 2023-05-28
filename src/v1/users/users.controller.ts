import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@supabase/supabase-js';

import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';

import { TopUpBalanceDto } from './dto/top-up-balance.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: AuthUser }) {
    try {
      const dbUser = await this.usersService.findOne(req.user.id);
      return { name: dbUser.name, balance: dbUser.balance };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @HttpCode(200)
  @Post('topup')
  async topUpBalance(
    @Request() req: { user: AuthUser },
    @Body() topUpBalanceDto: TopUpBalanceDto,
  ) {
    try {
      await this.usersService.topUpBalance(req.user.id, topUpBalanceDto.amount);
      return { message: 'Balance topped up' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
