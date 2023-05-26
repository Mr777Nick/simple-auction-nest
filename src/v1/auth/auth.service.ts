import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SupabaseService } from '../../common/supabase/supabase.service';
import { UsersService } from '../users/users.service';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private supabaseService: SupabaseService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.email);
    if (user && user.password === signInDto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn2(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUpToSupabase(signUpDto: SignUpDto) {
    try {
      const user = await this.supabaseService.signUp(
        signUpDto.email,
        signUpDto.password,
      );

      return user;
    } catch (error) {
      throw error;
    }
  }
}
