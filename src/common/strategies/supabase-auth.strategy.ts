import {
  AuthUser,
  SupabaseClient,
  UserResponse,
  createClient,
} from '@supabase/supabase-js';
import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';
import { Strategy } from 'passport-strategy';

export const UNAUTHORIZED = 'Unauthorized';
export const SUPABASE_AUTH = 'SUPABASE_AUTH';

export type SupabaseAuthUser = AuthUser;

export interface SupabaseAuthStrategyOptions {
  supabaseUrl: string;
  supabaseKey: string;
  extractor: JwtFromRequestFunction;
}

export class SupabaseAuthStrategy extends Strategy {
  readonly name = SUPABASE_AUTH;
  private supabase: SupabaseClient;
  private extractor: JwtFromRequestFunction;
  success: (user: any, info: any) => void;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fail: Strategy['fail'];

  constructor(options: SupabaseAuthStrategyOptions) {
    super();
    if (!options.extractor) {
      throw new Error(
        '\n Extractor is not a function. You should provide an extractor. \n Read the docs: https://github.com/tfarras/nestjs-firebase-auth#readme',
      );
    }

    this.supabase = createClient(options.supabaseUrl, options.supabaseKey);
    this.extractor = options.extractor;
  }

  authenticate(req: Request): void {
    const idToken = this.extractor(req);

    if (!idToken) {
      this.fail(UNAUTHORIZED, 401);
      return;
    }

    this.supabase.auth
      .getUser(idToken)
      .then((res) => this.validateSupabaseResponse(res))
      .catch((err) => {
        this.fail(err.message, 401);
      });
  }

  private async validateSupabaseResponse({ data }: UserResponse) {
    if (data.user) {
      this.success(data.user, {});
      return;
    }
    this.fail(UNAUTHORIZED, 401);
    return;
  }
}
