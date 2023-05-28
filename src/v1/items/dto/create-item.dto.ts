import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

import { MinDate } from '../../../common/decorators/min-date.decorator';

export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  startPrice: number;

  @IsNotEmpty()
  @IsDateString()
  @MinDate(new Date())
  endedAt: Date;
}
