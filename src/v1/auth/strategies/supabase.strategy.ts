import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

import { SupabaseAuthStrategy } from '../../../common/strategies/supabase-auth.strategy';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor(private configService: ConfigService) {
    super({
      supabaseUrl: configService.get<string>('SUPABASE_URL'),
      supabaseKey: configService.get<string>('SUPABASE_KEY'),
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  authenticate(req) {
    super.authenticate(req);
  }
}
