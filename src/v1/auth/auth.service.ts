import { Injectable } from '@nestjs/common';

import { SupabaseService } from '../../common/supabase/supabase.service';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signInToSupabase(signInDto: SignInDto) {
    try {
      const { email, password } = signInDto;
      const data = await this.supabaseService.signIn({ email, password });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async signUpToSupabase(signUpDto: SignUpDto) {
    try {
      const { email, password, name } = signUpDto;
      const user = await this.supabaseService.signUp({ email, password, name });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
