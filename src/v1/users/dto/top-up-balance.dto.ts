import { IsNotEmpty, IsNumber } from 'class-validator';

export class TopUpBalanceDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
