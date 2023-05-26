import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

import { ISignUp } from './interface/sign-up.interface';

@Injectable()
export class SupabaseService {
  constructor(private configService: ConfigService) {}

  private readonly supabase = createClient(
    this.configService.get<string>('SUPABASE_URL'),
    this.configService.get<string>('SUPABASE_KEY'),
  );

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
