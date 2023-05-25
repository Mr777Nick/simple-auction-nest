import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsNotEmpty()
  @Length(8, 32)
  password: string;
}
