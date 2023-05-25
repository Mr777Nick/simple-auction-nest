import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.email);
    if (user && user.password === signInDto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  signUp(signUpDto: SignUpDto) {
    return 'This action should sign up user.';
  }
}
