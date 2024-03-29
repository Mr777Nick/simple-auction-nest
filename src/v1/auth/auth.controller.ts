import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto) {
    try {
      const data = await this.authService.signInToSupabase(signInDto);

      // Stripping down the user object to avoid sending sensitive information
      const { session } = data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...rest } = session;

      return { message: 'User logged in', ...rest };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      await this.authService.signUpToSupabase(signUpDto);

      return { message: 'User created' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
