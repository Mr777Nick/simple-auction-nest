import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InternalTransaction } from './entity/internal-transactions.entity';
import { InternalTransactionsService } from './internal-transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([InternalTransaction])],
  providers: [InternalTransactionsService],
  exports: [InternalTransactionsService],
})
export class InternalTransactionsModule {}
