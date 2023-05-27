import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DatabaseValue } from '../../common/constant/database-value.constant';

import { InternalTransaction } from './entity/internal-transactions.entity';
import { ICreateInternalTransaction } from './interface/create-internal-transaction.interface';

@Injectable()
export class InternalTransactionsService {
  constructor(
    @InjectRepository(InternalTransaction)
    private internalTransactionsRepository: Repository<InternalTransaction>,
  ) {}

  async createOne(createInternalTransaction: ICreateInternalTransaction) {
    try {
      const { userId, type, amount, status } = createInternalTransaction;

      const internalTransaction = this.internalTransactionsRepository.create({
        user: { id: userId },
        type,
        amount,
        status,
      });

      await this.internalTransactionsRepository.save(internalTransaction);
      return internalTransaction;
    } catch (error) {
      throw error;
    }
  }
}
