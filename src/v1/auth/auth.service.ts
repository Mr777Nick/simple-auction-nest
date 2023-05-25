import { Injectable } from '@nestjs/common';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  signIn(signInDto: SignInDto) {
    return 'This action should sign in user and return a token.';
  }

  signUp(signUpDto: SignUpDto) {
    return 'This action should sign up user.';
  }
}
