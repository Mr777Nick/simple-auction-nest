import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

import { ISignIn } from './interface/sign-in.interface';
import { ISignUp } from './interface/sign-up.interface';

@Injectable()
export class SupabaseService {
  constructor(private configService: ConfigService) {}

  private readonly supabase = createClient(
    this.configService.get<string>('SUPABASE_URL'),
    this.configService.get<string>('SUPABASE_KEY'),
  );

  async signIn(signIn: ISignIn) {
    try {
      const { email, password } = signIn;

      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async signUp(signUp: ISignUp) {
    try {
      const { email, password, name } = signUp;

      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      if (data?.user?.identities?.length === 0) {
        throw 'User already registered';
      }

      return data.user;
    } catch (error) {
      throw error;
    }
  }
}
