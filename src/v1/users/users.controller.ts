import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@supabase/supabase-js';

import { SupabaseAuthGuard } from '../auth/guard/supabase-auth.guard';

import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: AuthUser }) {
    const dbUser = await this.usersService.findOne(req.user.id);
    return { name: dbUser.name, balance: dbUser.balance };
  }
}
