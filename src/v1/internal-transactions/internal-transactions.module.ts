import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InternalTransaction } from './entities/internal-transaction.entity';
import { InternalTransactionsService } from './internal-transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([InternalTransaction])],
  providers: [InternalTransactionsService],
  exports: [InternalTransactionsService],
})
export class InternalTransactionsModule {}
