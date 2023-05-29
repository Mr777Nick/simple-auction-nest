import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateItemBidDto {
  @IsNotEmpty()
  itemId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
